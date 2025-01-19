import Container from "@/components/layout/Container";
import ContactSection from "@/components/main/ContactSection";
import ExperienceSection from "@/components/main/ExperienceSection";
import HeroSection from "@/components/main/HeroSection";
import ProjectSection from "@/components/main/ProjectSection";

const MainView: React.FunctionComponent = () => {
  return (
    <Container className="grid grid-cols-1 items-start p-2.5 sm:p-0 justify-start gap-12">
      <HeroSection />
      <ExperienceSection />
      <ProjectSection />
      <ContactSection />
    </Container>
  );
};

export default MainView;
