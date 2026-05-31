import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
// import { Navbar } from "@/components/layout/navbar";
import { ContactSection } from "@/components/main/contact-section";
import { CraftSection } from "@/components/main/craft-section";
import { ExperienceSection } from "@/components/main/experience-section";
import { Header } from "@/components/main/header";
import { HeroSection } from "@/components/main/hero-section";
import { ProjectSection } from "@/components/main/project-section";
import { WorkTogether } from "@/components/main/work-together";

const MainView = () => (
  <>
    <div className="pointer-events-none fixed top-0 left-0 z-50 h-12 w-full to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]" />
    {/* <Navbar /> */}
    <Container className="grid grid-cols-1 items-start justify-start pt-20 pb-14">
      <Header />
      <HeroSection />
      <WorkTogether />
      <ProjectSection />
      <CraftSection />
      <ExperienceSection />
      <ContactSection />
    </Container>
    <Footer />
  </>
);

export default MainView;
