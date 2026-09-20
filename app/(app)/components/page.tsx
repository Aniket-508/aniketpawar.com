import { RegistryIndex } from "@/components/registry/registry-index";
import { REGISTRY_KINDS } from "@/lib/registry-items";
import { createMetadata } from "@/seo/metadata";

const config = REGISTRY_KINDS.component;

export const metadata = createMetadata({
  canonical: config.route,
  description: config.description,
  title: config.label,
});

const ComponentsPage = () => <RegistryIndex kind="component" />;

export default ComponentsPage;
