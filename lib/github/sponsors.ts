import "server-only";
import { unstable_cache } from "next/cache";

import { GITHUB } from "@/constants/links";
import { env } from "@/env";

interface GitHubSponsor {
  name: string;
  login: string;
  avatarUrl: string;
  url: string;
  websiteUrl: string | null;
}

interface SponsorsResponse {
  data: {
    user: {
      sponsorsListing: {
        sponsors: {
          nodes: (
            | {
                __typename: "User";
                login: string;
                name: string | null;
                avatarUrl: string;
                url: string;
                websiteUrl: string | null;
              }
            | {
                __typename: "Organization";
                login: string;
                name: string | null;
                avatarUrl: string;
                url: string;
                websiteUrl: string | null;
              }
          )[];
        };
      };
    };
  };
}

const SPONSORS_QUERY = `
  query GetSponsors($login: String!) {
    user(login: $login) {
      sponsorsListing {
        sponsors(first: 100) {
          nodes {
            ... on User {
              __typename
              login
              name
              avatarUrl
              url
              websiteUrl
            }
            ... on Organization {
              __typename
              login
              name
              avatarUrl
              url
              websiteUrl
            }
          }
        }
      }
    }
  }
`;

const fetchSponsors = async (): Promise<GitHubSponsor[]> => {
  if (!env.GITHUB_TOKEN) {
    return [];
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      body: JSON.stringify({
        query: SPONSORS_QUERY,
        variables: { login: GITHUB.user },
      }),
      headers: {
        Authorization: `bearer ${env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      return [];
    }

    const json = (await response.json()) as SponsorsResponse;
    const nodes = json.data?.user?.sponsorsListing?.sponsors?.nodes ?? [];

    return nodes.map((node) => ({
      avatarUrl: node.avatarUrl,
      login: node.login,
      name: node.name ?? node.login,
      url: node.url,
      websiteUrl: node.websiteUrl,
    }));
  } catch {
    return [];
  }
};

export const getSponsors = unstable_cache(fetchSponsors, ["github-sponsors"], {
  revalidate: 86_400,
});
