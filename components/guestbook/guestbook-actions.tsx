import { SignDialog } from "@/components/guestbook/sign-dialog";
import { SignInButton } from "@/components/guestbook/sign-in-button";
import { SignOutButton } from "@/components/guestbook/sign-out-button";
import { WallButton } from "@/components/guestbook/wall-button";
import type { AuthUser } from "@/types/auth";

interface GuestbookActionsProps {
  user: AuthUser | null;
}

const GuestbookActions = ({ user }: GuestbookActionsProps) => {
  if (user) {
    return (
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <SignDialog user={user} />
        <SignOutButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <SignInButton />
      <WallButton />
    </div>
  );
};

export { GuestbookActions };
