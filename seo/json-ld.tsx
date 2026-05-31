import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";

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
        urlTemplate: `${SITE.URL}?search={search_term_string}`,
      },
    },
    url: SITE.URL,
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
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
    logo: SITE.OG_IMAGE,
    name: SITE.NAME,
    sameAs: [LINK.GITHUB, LINK.TWITTER],
    url: SITE.URL,
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
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

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const JsonLdScripts = () => (
  <>
    <WebsiteJsonLd />
    <OrganizationJsonLd />
    <FAQJsonLd />
  </>
);

export { JsonLdScripts, WebsiteJsonLd, OrganizationJsonLd, FAQJsonLd };
