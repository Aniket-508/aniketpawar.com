"use client";

import { CheckIcon, SparklesIcon, TerminalIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  text: string;
  variant: "command" | "prompt";
}

const CopyButton = ({ text, variant }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = () => {
    if (copied) {return <CheckIcon />;}
    if (variant === "command") {return <TerminalIcon />;}
    return <SparklesIcon />;
  };

  const getLabel = () => {
    if (copied) {return "Copied!";}
    if (variant === "command") {return "Command";}
    return "Prompt";
  };

  return (
    <Button size="sm" variant="outline" onClick={handleCopy}>
      {getIcon()}
      {getLabel()}
    </Button>
  );
};

export { CopyButton };
