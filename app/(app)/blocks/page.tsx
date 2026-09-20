import { RegistryIndex } from "@/components/registry/registry-index";
import { REGISTRY_KINDS } from "@/lib/registry-items";
import { createMetadata } from "@/seo/metadata";

const config = REGISTRY_KINDS.block;

export const metadata = createMetadata({
  canonical: config.route,
  description: config.description,
  title: config.label,
});

const BlocksPage = () => <RegistryIndex kind="block" />;

export default BlocksPage;
