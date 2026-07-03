"use client";

import { Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { signIn } from "@/lib/auth-client";

interface SignInButtonProps {
  className?: string;
}

const SignInButton = ({ className }: SignInButtonProps) => (
  <Button
    className={className}
    onClick={() =>
      signIn.social({ callbackURL: ROUTES.GUESTBOOK, provider: "github" })
    }
    type="button"
  >
    <Github />
    Sign in with GitHub
  </Button>
);

export { SignInButton };
