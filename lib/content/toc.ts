import type { TOCItem } from "@/types/projects";

interface MdastNode {
  type?: string;
  depth?: number;
  children?: MdastNode[];
  value?: string;
  data?: {
    id?: string;
  };
}

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replaceAll(/[^\w\s-]/gu, "")
    .replaceAll(/\s+/gu, "-");

const textFromNode = (node: MdastNode): string => {
  if (node.value) {
    return node.value;
  }

  if (!node.children) {
    return "";
  }

  return node.children.map(textFromNode).join("");
};

export const tocFromMdast = (mdastJson: unknown): TOCItem[] => {
  if (typeof mdastJson !== "string" || mdastJson.length === 0) {
    return [];
  }

  const tree = JSON.parse(mdastJson) as MdastNode;
  const items: TOCItem[] = [];

  const walk = (node: MdastNode) => {
    if (
      node.type === "heading" &&
      node.depth &&
      node.depth >= 2 &&
      node.depth <= 3
    ) {
      const title = textFromNode(node).trim();
      if (title) {
        const id = node.data?.id ?? slugify(title);
        items.push({
          depth: node.depth,
          title,
          url: `#${id}`,
        });
      }
    }

    for (const child of node.children ?? []) {
      walk(child);
    }
  };

  walk(tree);
  return items;
};
