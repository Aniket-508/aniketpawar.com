import { ContactSection } from "@/components/contact-section";
import { CraftSection } from "@/components/craft-section";
import { ExperienceSection } from "@/components/experience-section";
import { HeaderSection } from "@/components/header-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectSection } from "@/components/project-section";
import { WorkTogether } from "@/components/work-together";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

const MainView = () => (
  <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
    <HeaderSection />
    <HeroSection />
    <WorkTogether />
    <ProjectSection />
    <CraftSection />
    <ExperienceSection />
    <ContactSection />
  </>
);

export default MainView;
