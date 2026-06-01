import { ContactSection } from "@/components/contact-section";
import { CraftSection } from "@/components/craft-section";
import { ExperienceSection } from "@/components/experience-section";
import { HeaderSection } from "@/components/header-section";
import { HeroSection } from "@/components/hero-section";
import { Container } from "@/components/layout/container";
import { ProjectSection } from "@/components/project-section";
import { WorkTogether } from "@/components/work-together";

const MainView = () => (
  <Container className="grid grid-cols-1 items-start justify-start pt-20 pb-14">
    <HeaderSection />
    <HeroSection />
    <WorkTogether />
    <ProjectSection />
    <CraftSection />
    <ExperienceSection />
    <ContactSection />
  </Container>
);

export default MainView;
