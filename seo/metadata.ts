import type { Metadata } from "next";

import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";
import { absoluteUrl } from "@/lib/utils";

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
}

const getOgImageUrl = (title?: string, description?: string): string => {
  const params = new URLSearchParams();
  if (title) {
    params.set("title", title);
  }
  if (description) {
    params.set("description", description);
  }
  const queryString = params.toString();
  return `${SITE.URL}/og${queryString ? `?${queryString}` : ""}`;
};

const createMetadata = (options: CreateMetadataOptions = {}): Metadata => {
  const {
    title,
    description = SITE.DESCRIPTION.SHORT,
    canonical,
    ogTitle,
    ogDescription,
    noIndex = false,
  } = options;

  const ogTitleText = ogTitle || title || SITE.NAME;
  const ogDescriptionText = ogDescription || description;
  const ogImage = getOgImageUrl(ogTitleText, ogDescriptionText);

  return {
    ...(title && { title }),
    description,
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
    openGraph: {
      description: ogDescriptionText,
      images: [
        {
          alt: ogTitleText,
          height: 630,
          url: ogImage,
          width: 1200,
        },
      ],
      title: ogTitleText,
      type: "website",
      url: canonical ? absoluteUrl(`${canonical}`) : SITE.URL,
    },
    twitter: {
      card: "summary_large_image",
      description: ogDescriptionText,
      images: [
        {
          alt: ogTitleText,
          height: 630,
          url: ogImage,
          width: 1200,
        },
      ],
      title: ogTitleText,
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
        alt: SITE.NAME,
        height: 630,
        url: getOgImageUrl(),
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
    default: SITE.NAME,
    template: `%s | ${SITE.NAME}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE.AUTHOR.TWITTER,
    description: SITE.DESCRIPTION.SHORT,
    images: [
      {
        alt: SITE.NAME,
        height: 630,
        url: getOgImageUrl(),
        width: 1200,
      },
    ],
    site: SITE.AUTHOR.TWITTER,
    title: SITE.NAME,
  },
};

export { baseMetadata, createMetadata, getOgImageUrl };
