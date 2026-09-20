import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { registry } from "../registry/index";
import { resolveItem } from "./registry-closure";

const REGISTRY_JSON = resolve(process.cwd(), "registry.json");

const build = () => {
  const failures: string[] = [];

  const items = registry.items.map((item) => {
    const { dependencies, errors, files } = resolveItem(item);

    for (const error of errors) {
      failures.push(`${item.name}: ${error}`);
    }

    return {
      ...item,
      dependencies,
      files,
    };
  });

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error(`❌ ${failure}`);
    }
    throw new Error(
      `${failures.length} registry item(s) would not install correctly`
    );
  }

  writeFileSync(
    REGISTRY_JSON,
    `${JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema/registry.json",
        homepage: registry.homepage,
        items,
        name: registry.name,
      },
      null,
      2
    )}\n`,
    "utf-8"
  );

  const fileCount = items.reduce((total, item) => total + item.files.length, 0);
  console.log(
    `✅ Generated registry.json (${items.length} items, ${fileCount} files)`
  );
};

build();
