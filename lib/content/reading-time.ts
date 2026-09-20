const WORDS_PER_MINUTE = 200;

interface MdastNode {
  type?: string;
  value?: string;
  children?: MdastNode[];
}

const textFromNode = (node: MdastNode): string => {
  if (node.value) {
    return node.value;
  }

  if (node.children) {
    return node.children.map(textFromNode).join(" ");
  }

  return "";
};

export const remarkReadingTime =
  () =>
  (
    tree: { children: MdastNode[] },
    file: { data: Record<string, unknown> }
  ) => {
    const text = tree.children.map(textFromNode).join(" ");
    const wordCount = text.trim().split(/\s+/u).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

    file.data.readingTime = minutes;
  };
