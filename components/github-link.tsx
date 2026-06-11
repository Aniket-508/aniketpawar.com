"use client";

import Link from "next/link";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { trackExternalLinkClick } from "@/lib/events";

const GITHUB_REPO_URL = "https://github.com/Aniket-508/aniketpawar.com";

export const GitHubLink = () => (
  <Button asChild size="icon" variant="ghost" className="size-6">
    <Link
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() =>
        trackExternalLinkClick({
          context: "github_link",
          link_type: "github",
          title: "site repo",
          url: GITHUB_REPO_URL,
        })
      }
    >
      <Icons.github />
    </Link>
  </Button>
);
