"use client";

import { Share2Icon } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { trackContentShare } from "@/lib/events";

interface ProjectShareButtonProps {
  title: string;
  url: string;
}

const ProjectShareButton = ({ title, url }: ProjectShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        trackContentShare(title, url, "native");
        return;
      } catch {
        // User cancelled or share failed — fall through to copy
      }
    }

    await navigator.clipboard.writeText(url);
    trackContentShare(title, url, "clipboard");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [title, url]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="gap-1.5"
    >
      <Share2Icon className="size-4" />
      {copied ? "Copied" : "Share"}
    </Button>
  );
};

export { ProjectShareButton };
