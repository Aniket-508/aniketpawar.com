import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { absoluteUrl } from "@/lib/utils";
import { getOgImageUrl } from "@/seo/metadata";

const JsonLdScript = ({ data }: { data: Record<string, unknown> }) => (
  <script
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    type="application/ld+json"
  />
);

const WebsiteJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: SITE.DESCRIPTION.SHORT,
    inLanguage: "en-US",
    name: SITE.NAME,
    potentialAction: {
      "@type": "SearchAction",
      "query-input": "required name=search_term_string",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl(`?search={search_term_string}`),
      },
    },
    url: SITE.URL,
  };

  return <JsonLdScript data={jsonLd} />;
};

const OrganizationJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    founder: {
      "@type": "Person",
      name: SITE.AUTHOR.NAME,
      url: SITE.URL,
    },
    logo: getOgImageUrl(),
    name: SITE.NAME,
    sameAs: [LINK.GITHUB, LINK.TWITTER],
    url: SITE.URL,
  };

  return <JsonLdScript data={jsonLd} />;
};

const FAQJsonLd = () => {
  const faqs = [
    {
      answer: SITE.DESCRIPTION.LONG,
      question: "Who is Aniket Pawar?",
    },
    {
      answer:
        "Specializing in Frontend Engineering and Product Design, building high-fidelity, design-led digital products using React, Next.js, and modern web technologies.",
      question: "What are Aniket's areas of expertise?",
    },
    {
      answer: `You can reach out to Aniket via his social profiles on LinkedIn and GitHub, or visit his website at ${SITE.URL}.`,
      question: "How can I contact Aniket?",
    },
    {
      answer: "Aniket is a software engineer based in India.",
      question: "Where is Aniket based?",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
      name: faq.question,
    })),
  };

  return <JsonLdScript data={jsonLd} />;
};

interface BreadcrumbItem {
  name: string;
  path: string;
}

const normalizeBreadcrumbPath = (path: string): string => {
  if (path === ROUTES.HOME) {
    return ROUTES.HOME;
  }

  return path.startsWith("/") ? path : `${ROUTES.HOME}${path}`;
};

const HOME_BREADCRUMB: BreadcrumbItem = { name: "Home", path: ROUTES.HOME };

const projectsBreadcrumbs = (current?: BreadcrumbItem): BreadcrumbItem[] => [
  HOME_BREADCRUMB,
  { name: "Projects", path: ROUTES.PROJECTS },
  ...(current ? [current] : []),
];

const craftsBreadcrumbs = (current?: BreadcrumbItem): BreadcrumbItem[] => [
  HOME_BREADCRUMB,
  { name: "Crafts", path: ROUTES.CRAFTS },
  ...(current ? [current] : []),
];

const experiencesBreadcrumbs = (current?: BreadcrumbItem): BreadcrumbItem[] => [
  HOME_BREADCRUMB,
  { name: "Experience", path: ROUTES.EXPERIENCES },
  ...(current ? [current] : []),
];

const stackBreadcrumbs = (current?: BreadcrumbItem): BreadcrumbItem[] => [
  HOME_BREADCRUMB,
  { name: "Stack", path: ROUTES.STACK },
  ...(current ? [current] : []),
];

const BreadcrumbJsonLd = ({ items }: { items: BreadcrumbItem[] }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: absoluteUrl(`${normalizeBreadcrumbPath(item.path)}`),
      name: item.name,
      position: index + 1,
    })),
  };

  return <JsonLdScript data={jsonLd} />;
};

const JsonLdScripts = () => (
  <>
    <WebsiteJsonLd />
    <OrganizationJsonLd />
    <FAQJsonLd />
  </>
);

export {
  BreadcrumbJsonLd,
  craftsBreadcrumbs,
  experiencesBreadcrumbs,
  JsonLdScripts,
  projectsBreadcrumbs,
  stackBreadcrumbs,
  WebsiteJsonLd,
  OrganizationJsonLd,
  FAQJsonLd,
};
export type { BreadcrumbItem };
