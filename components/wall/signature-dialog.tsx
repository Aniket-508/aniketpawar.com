"use client";

import { format } from "date-fns";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { GuestbookSignature } from "@/types/guestbook";

interface SignatureDialogProps {
  onClose: () => void;
  signature: GuestbookSignature;
}

const SignatureDialog = ({ onClose, signature }: SignatureDialogProps) => {
  const githubUrl = `https://github.com/${signature.username}`;
  const displayName = signature.name ?? signature.username;
  const formattedDate = format(new Date(signature.created_at), "MMM d, yyyy");

  return (
    <dialog
      className="fixed inset-0 z-50 m-auto w-[calc(100%-2rem)] max-w-sm rounded-lg border border-border bg-background p-0 shadow-lg backdrop:bg-black/50 open:animate-in open:fade-in-0 open:zoom-in-95"
      onClose={onClose}
      open
    >
      <div className="space-y-4 px-4 py-4">
        <h2 className="font-medium text-base">{displayName}</h2>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-accent">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={`Signature by ${displayName}`}
            className="absolute inset-0 h-full w-full object-contain p-4 dark:invert"
            loading="lazy"
            src={signature.signature}
          />
        </div>

        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <span>Signed {formattedDate}</span>
          <a
            className="inline-flex items-center gap-1 text-foreground hover:underline"
            href={githubUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            @{signature.username}
            <ExternalLink className="size-3" />
          </a>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose} type="button">
            Close
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export { SignatureDialog };
