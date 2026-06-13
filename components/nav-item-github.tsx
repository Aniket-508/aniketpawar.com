"use client";

import Link from "next/link";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { LINK } from "@/constants/links";
import { trackExternalLinkClick } from "@/lib/events";

export const NavItemGitHub = () => (
  <Button
    size="icon-sm"
    variant="ghost"
    nativeButton={false}
    render={
      <Link
        href={LINK.GITHUB_REPO}
        target="_blank"
        rel="noreferrer"
        onClick={() =>
          trackExternalLinkClick({
            context: "github_link",
            link_type: "github",
            title: "site repo",
            url: LINK.GITHUB_REPO,
          })
        }
      />
    }
  >
    <Icons.github />
  </Button>
);
