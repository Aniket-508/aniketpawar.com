import Container from "@/components/layout/Container"
import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import ContactSection from "@/components/main/ContactSection"
import ExperienceSection from "@/components/main/ExperienceSection"
import Header from "@/components/main/Header"
import HeroSection from "@/components/main/HeroSection"
import ProjectSection from "@/components/main/ProjectSection"
import WorkTogether from "@/components/main/WorkTogether"

const MainView: React.FunctionComponent = () => {
  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-50 h-12 w-full to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]" />
      {/* <Navbar /> */}
      <Container className="grid grid-cols-1 items-start justify-start pb-14 pt-20">
        <Header />
        <HeroSection />
        <WorkTogether />
        <ProjectSection />
        <ExperienceSection />
        <ContactSection />
      </Container>
      <Footer />
    </>
  )
}

export default MainView
