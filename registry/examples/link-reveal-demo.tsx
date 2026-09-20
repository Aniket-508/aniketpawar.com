import { LinkReveal } from "@/registry/components/link-reveal/link-reveal";

const LinkRevealDemo = () => (
  <div className="flex items-center justify-center p-8">
    <LinkReveal
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      favicon="https://github.com/favicon.ico"
      primaryColor="#0969da"
    >
      GitHub
    </LinkReveal>
  </div>
);

export { LinkRevealDemo };
