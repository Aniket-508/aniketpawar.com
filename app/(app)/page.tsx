import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { CraftSection } from "@/components/craft-section";
import { ExperienceSection } from "@/components/experience-section";
import { HeaderSection } from "@/components/header-section";
import { ProjectSection } from "@/components/project-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

const MainView = () => (
  <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
    <HeaderSection />
    <AboutSection />
    <TechStackSection />
    <ProjectSection />
    <CraftSection />
    <ExperienceSection />
    <ContactSection />
  </>
);

export default MainView;
