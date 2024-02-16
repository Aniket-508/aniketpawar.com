import { ExperienceItemProps } from "@/components/main/ExperienceSection";

export const getExperiences = function (): ExperienceItemProps[] {
  return [
    {
      experienceTitle: "SDE-2",
      experienceDescription: [
        "Developed the new website entirely from scratch using NextJS with SSG in record time.",
        "Implemented in-house component design system, reducing loading & build time by 70%.",
        "Developed various features for internal CMS tool to automate creation of assessments.",
        "Integrated Strapi CMS for rapid, performant static page generation by business/content teams aiding SEO.",
        "Developed a microservice for on-demand generation and delivery of candidate reports in PDF format,, allowing them to be sent as a single file or in bulk.",
        "Built React Native app for the assessment dashboard that runs on iOS, Android, and the web, achieving an 85% concurrency of the codebase.",
        "Contributed to two successful ProductHunt launches: EasySource (#5 Product of the Day) and JD Generator (#1 Product of the Day).",
      ],
      experienceOrg: {
        name: "HireQuotient",
        link: "https://www.hirequotient.com/",
        websiteDisplayName: "hirequotient.com",
      },
      experienceStatus: {
        startAt: "Jun, 2022",
        endAt: "Present",
      },
      experienceTech: [
        "HTML5",
        "CSS3",
        "SASS",
        "Material UI",
        "Tailwind CSS",
        "Bootstrap",
        "JavaScript",
        "React",
        "Redux Saga",
        "Next.js",
        "TypeScript",
        "Strapi CMS",
        "Express.js",
        "Node.js",
        "MongoDB",
        "Mongoose",
        "AWS",
        "GCP",
      ],
    },
    {
      experienceTitle: "Software Engineer Intern",
      experienceDescription: [
        "Developed financial calculators module from scratch for SEO purposes.",
        "Developed the Company Financials Component for US Stocks Detail page.",
        "Built the Fixed Deposit Purchase Flow on Web handling KYC and Non-KYCed users.",
        "Implemented Family Account Invite Flow on Web from scratch.",
      ],
      experienceOrg: {
        name: "INDmoney",
        link: "https://www.indmoney.com/",
        websiteDisplayName: "indmoney.com",
      },
      experienceStatus: {
        startAt: "Jan, 2022",
        endAt: "Jun, 2022",
      },
      experienceTech: [
        "Tailwind CSS",
        "React",
        "React Query",
        "React Hook Form",
        "React Highcharts",
        "Next.js",
        "TypeScript",
        "Strapi CMS",
      ],
    },
    {
      experienceTitle: "Web Development Intern",
      experienceDescription: [
        "Started contributing as a design contributor and contributed to AsyncAPI website project using ReactJS and TailwindCSS.",
        "Working on auditing existing components created using TailwindCSS support; Fixed UX for components, improved layouts for upcoming features.",
        "Tools I work with during contribution: Figma, Git/GitHub, Slack, Netlify, Storybook, React, TailwindCSS, NextJS, Javascript.",
      ],
      experienceOrg: {
        name: "Youniv",
        link: "https://www.linkedin.com/company/younivapp/",
        websiteDisplayName: "youniv",
      },
      experienceStatus: {
        startAt: "Dec, 2021",
        endAt: "Jan, 2022",
      },
      experienceTech: ["Bootstrap", "Next.js", "Recoil", "Firebase"],
    },
    {
      experienceTitle: "Web Development Intern",
      experienceDescription: [
        "Designed and developed various responsive UI components for company's website named 'KritikalHire' from scratch.",
        "Designed and developed company’s another website named 'ServingNotice' completely from scratch.",
        "Built a blog site along with an admin panel having CRUD functionalities.",
      ],
      experienceOrg: {
        name: "e-InnoSec Advisory and Consulting",
        link: "https://www.einnosec.com",
        websiteDisplayName: "einnosec.com",
      },
      experienceStatus: {
        startAt: "Nov, 2021",
        endAt: "Jan, 2022",
      },
      experienceTech: [
        "HTML5",
        "CSS3",
        "Bootstrap",
        "JavaScript",
        "PHP",
        "MySQL",
        "React",
        "Express.js",
        "Node.js",
        "MongoDB",
        "Mongoose",
      ],
    },
  ];
};
