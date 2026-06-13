import "server-only";
import { execSync } from "node:child_process";

import { unstable_cache } from "next/cache";

import type { Activity } from "@/components/contribution-graph";
import { GITHUB } from "@/constants/links";

interface GitHubContributionsResponse {
  contributions: Activity[];
}

export const getGitHubContributions = unstable_cache(
  async () => {
    const res = await fetch(
      `${process.env.GITHUB_CONTRIBUTIONS_API_URL || `https://github-contributions-api.jogruber.de`}/v4/${GITHUB.user}?y=last`
    );
    const data = (await res.json()) as GitHubContributionsResponse;
    return data.contributions;
  },
  ["github-contributions"],
  // Cache for 1 day (86400 seconds)
  { revalidate: 86_400 }
);

export const getLastUpdated = (): string => {
  try {
    const date = execSync("git log -1 --format=%cd", {
      encoding: "utf-8",
      timeout: 5000,
    }).trim();

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
};
