export const GITHUB = {
  branch: "main",
  org: "shadcn-labs",
  repo: "aniketpawar.com",
  user: "Aniket-508",
} as const;

const GITHUB_URL = `https://github.com/${GITHUB.user}`;

export const LINK = {
  BLUESKY: "https://bsky.app/profile/alaymanguy.bsky.social",
  CALENDLY: "https://cal.com/aniket-pawar",
  CLARITY: "https://clarity.microsoft.com",
  DAILYDEV: "https://daily.dev/aniket508",
  DISCORD: "https://discordapp.com/users/393317827186130964",
  EMAIL: "pawaraniket508@gmail.com",
  GITHUB: GITHUB_URL,
  GITHUB_REPO: `https://github.com/${GITHUB.user}/${GITHUB.repo}`,
  LICENSE: `${GITHUB_URL}/blob/${GITHUB.branch}/LICENSE`,
  LINKEDIN: "https://www.linkedin.com/in/aniketpawar508",
  PEERLIST: "https://peerlist.io/aniket_pawar",
  RESUME: "/resume.pdf",
  SHADCN_LABS: "https://shadcn-labs.com",
  SHADCN_UI: "https://ui.shadcn.com",
  SPONSOR: `https://github.com/sponsors/${GITHUB.user}`,
  TELEGRAM: "https://t.me/Aniket_508",
  TOKSCALE: "https://tokscale.ai",
  TOPMATE: "https://topmate.io/aniket_pawar",
  TWITTER: "https://x.com/alaymanguy",
  X: "https://x.com/alaymanguy",
  X_SHADCN_LABS: "https://x.com/shadcnlabs",
  YOUTUBE: "https://youtube.com/@aniketpawarbuilds",
} as const;

const STORAGE_URL =
  "https://yffrvzi8zwbljfuj.public.blob.vercel-storage.com/portfolio-website";

export const ASSETS = {
  CRUD_DIALOG_ANIMATION: `${STORAGE_URL}/crud_dialog_animation.mp4`,
  FIRE: `${STORAGE_URL}/fogonovo.gif`,
  FOUNDER_LETTER_ANIMATION: `${STORAGE_URL}/founder_letter_animation.mp4`,
};
