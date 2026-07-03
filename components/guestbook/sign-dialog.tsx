"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";

import { SignaturePad } from "@/components/signature-pad/signature-pad";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { signatureApi, SignatureUploadError } from "@/lib/api/signature";
import { useSignGuestbook } from "@/lib/hooks/use-guestbook";
import { cn } from "@/lib/utils";
import type { AuthUser } from "@/types/auth";

type SubmitState = "idle" | "uploading-signature" | "signing";

interface SignDialogProps {
  user: AuthUser;
}

const SignDialog = ({ user }: SignDialogProps) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [message, setMessage] = useState("");
  const [showMessageError, setShowMessageError] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const signatureRef = useRef<string | null>(null);
  const signMutation = useSignGuestbook();

  const isSubmitting = submitState !== "idle";

  const getSubmitLabel = () => {
    if (submitState === "uploading-signature") {
      return "Uploading signature...";
    }

    if (submitState === "signing") {
      return "Signing...";
    }

    return "Sign";
  };

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setMessage("");
    signatureRef.current = null;
    setShowMessageError(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setShowMessageError(true);
      toast.error("Please enter a message");
      return;
    }

    try {
      let signatureUrl: string | null = null;

      if (signatureRef.current) {
        setSubmitState("uploading-signature");
        signatureUrl = await signatureApi.upload(signatureRef.current);
      }

      setSubmitState("signing");

      await signMutation.mutateAsync({
        author: {
          name: user.name ?? null,
          username: user.username,
        },
        message: trimmedMessage,
        signature: signatureUrl,
      });

      closeDialog();
      router.refresh();
    } catch (error) {
      if (error instanceof SignatureUploadError) {
        toast.error(error.message);
      }
    } finally {
      setSubmitState("idle");
    }
  };

  return (
    <>
      <Button onClick={openDialog} type="button">
        Sign guestbook
      </Button>

      <dialog
        className={cn(
          "fixed inset-0 z-50 m-auto w-[calc(100%-2rem)] max-w-md rounded-lg border border-border bg-background p-0 shadow-lg backdrop:bg-black/50",
          "open:animate-in open:fade-in-0 open:zoom-in-95"
        )}
        onClose={closeDialog}
        ref={dialogRef}
      >
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="space-y-1 border-border border-b px-4 py-3">
            <h2 className="font-medium text-base">Sign my guestbook</h2>
            <p className="text-muted-foreground text-sm">
              Signed in as {user.name ?? user.username}
            </p>
          </div>

          <div className="space-y-4 px-4 py-4">
            <div className="space-y-2">
              <label
                className="font-medium text-sm"
                htmlFor="guestbook-message"
              >
                Leave a message
              </label>
              <Textarea
                aria-invalid={showMessageError}
                id="guestbook-message"
                maxLength={500}
                onChange={(event) => {
                  setMessage(event.target.value);

                  if (showMessageError && event.target.value.trim()) {
                    setShowMessageError(false);
                  }
                }}
                rows={3}
                value={message}
              />
            </div>

            <div className="space-y-2">
              <p className="font-medium text-sm">Sign here</p>
              <SignaturePad
                className="mt-2 aspect-video h-40 w-full rounded-lg border border-border bg-transparent"
                onChange={(value) => {
                  signatureRef.current = value;
                }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-border border-t px-4 py-3">
            <Button
              disabled={isSubmitting}
              onClick={closeDialog}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {getSubmitLabel()}
            </Button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export { SignDialog };
