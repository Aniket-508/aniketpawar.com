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

export const getStargazerCount = unstable_cache(
  async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB.user}/${GITHUB.repo}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      if (!response.ok) {
        return 0;
      }

      const json = (await response.json()) as { stargazers_count?: number };
      return Number(json?.stargazers_count) || 0;
    } catch {
      return 0;
    }
  },
  ["github-stargazer-count"],
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
