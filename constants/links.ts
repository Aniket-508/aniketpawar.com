export const GITHUB = {
  branch: "main",
  org: "shadcn-labs",
  repo: "aniketpawar.com",
  user: "Aniket-508",
} as const;

const GITHUB_URL = `https://github.com/${GITHUB.user}`;
const GITHUB_ORG_URL = `https://github.com/${GITHUB.org}`;

export const LINK = {
  CALENDLY: "https://cal.com/aniket-pawar",
  DISCORD: "https://discordapp.com/users/393317827186130964",
  GITHUB: GITHUB_URL,
  GITHUB_ORG: GITHUB_ORG_URL,
  GITHUB_REPO: `https://github.com/${GITHUB.user}/${GITHUB.repo}`,
  LICENSE: `${GITHUB_URL}/blob/${GITHUB.branch}/LICENSE`,
  LINKEDIN: "https://www.linkedin.com/in/aniketpawar508",
  PEERLIST: "https://peerlist.io/aniket_pawar",
  RESUME: "/resume.pdf",
  SHADCN_UI: "https://ui.shadcn.com",
  SPONSOR: `https://github.com/sponsors/${GITHUB.user}`,
  TOPMATE: "https://topmate.io/aniket_pawar",
  TWITTER: "https://x.com/alaymanguy",
  X: "https://x.com/alaymanguy",
  X_SHADCN_LABS: "https://x.com/shadcnlabs",
} as const;
