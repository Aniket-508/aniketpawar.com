"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface InstallCommandProps {
  command: string;
  className?: string;
}

const InstallCommand = ({ command, className }: InstallCommandProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border border-border/50 bg-background p-3",
        className
      )}
    >
      <code className="flex-1 text-sm text-muted-foreground font-mono break-all">
        {command}
      </code>
      <button
        type="button"
        className="shrink-0 text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <CheckIcon className="size-3" />
            Copied
          </>
        ) : (
          <>
            <CopyIcon className="size-3" />
            Copy
          </>
        )}
      </button>
    </div>
  );
};

export { InstallCommand };
