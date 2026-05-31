import type { Metadata } from "next";

import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
}

const createMetadata = (options: CreateMetadataOptions = {}): Metadata => {
  const {
    title,
    description = SITE.DESCRIPTION.SHORT,
    canonical,
    ogTitle,
    ogDescription,
    noIndex = false,
  } = options;

  return {
    ...(title && { title }),
    description,
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
    openGraph: {
      description: ogDescription || description,
      title: ogTitle || title || SITE.NAME,
      type: "website",
      url: canonical ? `${SITE.URL}${canonical}` : SITE.URL,
    },
    twitter: {
      description: ogDescription || description,
      title: ogTitle || title || SITE.NAME,
    },
    ...(noIndex && {
      robots: {
        follow: false,
        index: false,
      },
    }),
  };
};

const baseMetadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE.NAME,
  },
  applicationName: SITE.NAME,
  authors: [{ name: SITE.AUTHOR.NAME, url: LINK.TWITTER }],
  category: "technology",
  creator: SITE.AUTHOR.NAME,
  description: SITE.DESCRIPTION.LONG,
  icons: {
    apple: {
      sizes: "180x180",
      type: "image/png",
      url: "/apple-touch-icon.png",
    },
    icon: [
      {
        sizes: "32x32",
        url: "/favicon.ico",
      },
      {
        sizes: "any",
        type: "image/svg+xml",
        url: "/favicon.svg",
      },
    ],
    shortcut: "/favicon-16x16.png",
  },
  keywords: [...SITE.KEYWORDS],
  metadataBase: new URL(SITE.URL),
  openGraph: {
    description: SITE.DESCRIPTION.SHORT,
    images: [
      {
        alt: `${SITE.NAME}`,
        height: 630,
        url: SITE.OG_IMAGE,
        width: 1200,
      },
    ],
    locale: "en_US",
    siteName: SITE.NAME,
    title: SITE.NAME,
    type: "website",
    url: SITE.URL,
  },
  publisher: SITE.AUTHOR.NAME,
  title: {
    default: `${SITE.NAME}`,
    template: `%s | ${SITE.NAME}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE.AUTHOR.TWITTER,
    description: SITE.DESCRIPTION.SHORT,
    images: [
      {
        alt: `${SITE.NAME}`,
        height: 630,
        url: SITE.OG_IMAGE,
        width: 1200,
      },
    ],
    site: SITE.AUTHOR.TWITTER,
    title: `${SITE.NAME}`,
  },
};

export { baseMetadata, createMetadata };
