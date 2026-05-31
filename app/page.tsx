// import { Navbar } from "@/components/layout/navbar";
import { ContactSection } from "@/components/contact-section";
// import { CraftSection } from "@/components/craft-section";
import { ExperienceSection } from "@/components/experience-section";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { ProjectSection } from "@/components/project-section";
import { WorkTogether } from "@/components/work-together";

const MainView = () => (
  <>
    <div className="pointer-events-none fixed top-0 left-0 z-50 h-12 w-full to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]" />
    {/* <Navbar /> */}
    <Container className="grid grid-cols-1 items-start justify-start pt-20 pb-14">
      <Header />
      <HeroSection />
      <WorkTogether />
      <ProjectSection />
      {/* <CraftSection /> */}
      <ExperienceSection />
      <ContactSection />
    </Container>
    <Footer />
  </>
);

export default MainView;
