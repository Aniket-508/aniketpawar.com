"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";

interface SignOutButtonProps {
  className?: string;
}

const SignOutButton = ({ className }: SignOutButtonProps) => {
  const router = useRouter();

  return (
    <Button
      className={className}
      onClick={async () => {
        await signOut();
        router.refresh();
      }}
      type="button"
      variant="outline"
    >
      <LogOut />
      Sign out
    </Button>
  );
};

export { SignOutButton };
