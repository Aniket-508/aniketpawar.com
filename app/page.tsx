import { AboutSection } from "@/components/about/section";
import { ContactSection } from "@/components/contact/section";
import { CraftSection } from "@/components/craft/section";
import { ExperienceSection } from "@/components/experience/section";
import { ProjectSection } from "@/components/project/section";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

const MainView = () => (
  <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
    <h1 className="sr-only">
      {SITE.NAME} — {SITE.DESCRIPTION.SHORT}
    </h1>
    <AboutSection />
    <ProjectSection />
    <CraftSection />
    <ExperienceSection />
    <ContactSection />
  </>
);

export default MainView;
