import type { LinkRevealData } from "./types";

const THEME_COLOR_REGEX =
  /<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/iu;
const THEME_COLOR_CONTENT_REGEX =
  /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']theme-color["']/iu;

const EMPTY_DATA: LinkRevealData = {
  favicon: null,
  primaryColor: null,
};

const extractContent = (match: RegExpMatchArray | null): string | null =>
  match?.at(1) ?? null;

const getFaviconUrl = (url: string): string => {
  try {
    const { hostname } = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
  } catch {
    return "";
  }
};

export const fetchLinkRevealData = async (
  url: string
): Promise<LinkRevealData> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LinkReveal/1.0)" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return { ...EMPTY_DATA, favicon: getFaviconUrl(url) };
    }

    const html = await response.text();
    const themeColorMatch =
      html.match(THEME_COLOR_REGEX) || html.match(THEME_COLOR_CONTENT_REGEX);

    return {
      favicon: getFaviconUrl(url),
      primaryColor: extractContent(themeColorMatch),
    };
  } catch {
    return EMPTY_DATA;
  }
};
