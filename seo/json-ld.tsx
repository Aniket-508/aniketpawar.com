import { LINK, SITE } from "@/constants"

const WebsiteJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.NAME,
    url: SITE.URL,
    description: SITE.DESCRIPTION.SHORT,
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.URL}?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  )
}

const OrganizationJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.NAME,
    url: SITE.URL,
    logo: SITE.OG_IMAGE,
    sameAs: [LINK.GITHUB, LINK.TWITTER],
    founder: {
      "@type": "Person",
      name: SITE.AUTHOR.NAME,
      url: SITE.AUTHOR.URL,
    },
  }

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  )
}

const FAQJsonLd = () => {
  const faqs = [
    {
      question: "Who is Aniket Pawar?",
      answer: SITE.DESCRIPTION.LONG,
    },
    {
      question: "What are Aniket's areas of expertise?",
      answer:
        "Specializing in Frontend Engineering and Product Design, building high-fidelity, design-led digital products using React, Next.js, and modern web technologies.",
    },
    {
      question: "How can I contact Aniket?",
      answer: `You can reach out to Aniket via his social profiles on LinkedIn and GitHub, or visit his website at ${SITE.URL}.`,
    },
    {
      question: "Where is Aniket based?",
      answer: "Aniket is a software engineer based in India.",
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  )
}

const JsonLdScripts = () => {
  return (
    <>
      <WebsiteJsonLd />
      <OrganizationJsonLd />
      <FAQJsonLd />
    </>
  )
}

export { JsonLdScripts, WebsiteJsonLd, OrganizationJsonLd, FAQJsonLd }
