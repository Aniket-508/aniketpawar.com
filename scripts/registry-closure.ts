import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";

import type { RegistryItem } from "shadcn/schema";

type RegistryFile = NonNullable<RegistryItem["files"]>[number];

const ROOT = process.cwd();
const IMPORT_REGEX = /(?:from|import)\s+["']([^"']+)["']/gu;
const TS_EXTENSIONS = [".ts", ".tsx"];

/** Provided by `shadcn init`, so items must not ship their own copy. */
const SHADCN_PROVIDED: Record<string, true> = { "lib/utils": true };
/** Bundled with every React project; never listed as a registry dependency. */
const IMPLICIT_PACKAGES: Record<string, true> = {
  react: true,
  "react-dom": true,
};
/** Local directories whose files install at the exact same path. */
const IDENTITY_ROOTS = ["components/", "hooks/", "lib/", "types/"];

const isFile = (path: string) => existsSync(path) && statSync(path).isFile();

const stripExtension = (path: string) => path.replace(/\.(ts|tsx)$/u, "");

/** Resolves an alias-free repo path ("components/charts/line") to a real file. */
const resolveRepoPath = (relative: string): string | null => {
  const candidates = [
    relative,
    ...TS_EXTENSIONS.map((ext) => `${relative}${ext}`),
    ...TS_EXTENSIONS.map((ext) => `${relative}/index${ext}`),
  ];

  return candidates.find((candidate) => isFile(join(ROOT, candidate))) ?? null;
};

const packageNameOf = (specifier: string) =>
  specifier.startsWith("@")
    ? specifier.split("/").slice(0, 2).join("/")
    : (specifier.split("/")[0] ?? specifier);

const importsOf = (repoPath: string): string[] => {
  const source = readFileSync(join(ROOT, repoPath), "utf-8");

  return [...source.matchAll(IMPORT_REGEX)].map((match) => match[1] as string);
};

const inferType = (repoPath: string): RegistryFile["type"] => {
  if (repoPath.startsWith("components/ui/")) {
    return "registry:ui";
  }
  if (repoPath.startsWith("hooks/")) {
    return "registry:hook";
  }
  if (repoPath.startsWith("components/") && repoPath.endsWith(".tsx")) {
    return "registry:component";
  }

  return "registry:lib";
};

/** Files outside the identity roots need an explicit target in `_registry.ts`. */
const inferTarget = (repoPath: string): string | null =>
  IDENTITY_ROOTS.some((root) => repoPath.startsWith(root))
    ? `@/${repoPath}`
    : null;

const installPathOf = (file: RegistryFile) =>
  file.target ? file.target.replace(/^@\//u, "") : file.path;

/** An import specifier may point at a file directly or at its folder index. */
const resolvesTo = (installPath: string, specifierPath: string) => {
  const installed = stripExtension(installPath);
  const wanted = stripExtension(specifierPath);

  return installed === wanted || installed === `${wanted}/index`;
};

export interface ResolvedItem {
  files: RegistryFile[];
  dependencies: string[];
  errors: string[];
}

/**
 * Walks every import reachable from an item's entry files and returns the full
 * set of shippable files plus npm dependencies. Errors describe imports that
 * would break after `shadcn add` (unknown module, or a relative import whose
 * target no longer sits next to the importing file).
 */
export const resolveItem = (item: RegistryItem): ResolvedItem => {
  const declared = new Map<string, RegistryFile>(
    (item.files ?? []).map((file) => [file.path, file])
  );
  const errors: string[] = [];
  const packages = new Set<string>();
  const queue = [...declared.keys()];
  const visited = new Set<string>();

  const ship = (repoPath: string, importedBy: string): RegistryFile | null => {
    const existing = declared.get(repoPath);
    if (existing) {
      return existing;
    }

    const target = inferTarget(repoPath);
    if (!target) {
      errors.push(
        `${repoPath} (imported by ${importedBy}) needs an explicit target in the registry definition`
      );
      return null;
    }

    const file: RegistryFile = {
      path: repoPath,
      target,
      type: inferType(repoPath),
    };
    declared.set(repoPath, file);
    queue.push(repoPath);

    return file;
  };

  while (queue.length > 0) {
    const repoPath = queue.pop() as string;
    if (visited.has(repoPath)) {
      continue;
    }
    visited.add(repoPath);

    if (!isFile(join(ROOT, repoPath))) {
      errors.push(`${repoPath} does not exist`);
      continue;
    }

    for (const specifier of importsOf(repoPath)) {
      if (specifier.startsWith("node:")) {
        continue;
      }

      if (specifier.startsWith("@/")) {
        const aliasPath = specifier.slice(2);
        if (SHADCN_PROVIDED[stripExtension(aliasPath)]) {
          continue;
        }

        const resolved = resolveRepoPath(aliasPath);
        if (!resolved) {
          errors.push(`${specifier} (imported by ${repoPath}) does not exist`);
          continue;
        }

        const shipped = ship(resolved, repoPath);
        if (shipped && !resolvesTo(installPathOf(shipped), aliasPath)) {
          errors.push(
            `${specifier} (imported by ${repoPath}) installs to @/${installPathOf(shipped)}`
          );
        }
        continue;
      }

      if (specifier.startsWith(".")) {
        const resolved = resolveRepoPath(join(dirname(repoPath), specifier));
        if (!resolved) {
          errors.push(`${specifier} (imported by ${repoPath}) does not exist`);
          continue;
        }

        const shipped = ship(resolved, repoPath);
        const importer = declared.get(repoPath);
        if (shipped && importer) {
          const expected = stripExtension(
            join(dirname(installPathOf(importer)), specifier)
          );
          if (stripExtension(installPathOf(shipped)) !== expected) {
            errors.push(
              `relative import "${specifier}" in ${repoPath} breaks after install: expected @/${expected}, ships to @/${installPathOf(shipped)}`
            );
          }
        }
        continue;
      }

      const name = packageNameOf(specifier);
      if (!IMPLICIT_PACKAGES[name]) {
        packages.add(name);
      }
    }
  }

  const files = [...declared.values()].toSorted((a, b) =>
    a.path.localeCompare(b.path)
  );

  return {
    dependencies: [...packages].toSorted(),
    errors: [...new Set(errors)].toSorted(),
    files,
  };
};
