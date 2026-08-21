import { AboutSection } from "@/components/about/section";
import { ContactSection } from "@/components/contact/section";
import { CraftSection } from "@/components/craft/section";
import { ExperienceSection } from "@/components/experience/section";
import { PageContent } from "@/components/page-content";
import { ProjectSection } from "@/components/project/section";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

const MainView = () => (
  <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
    <PageContent>
      <AboutSection />
      <ProjectSection />
      <CraftSection />
      <ExperienceSection />
      <ContactSection />
    </PageContent>
  </>
);

export default MainView;
