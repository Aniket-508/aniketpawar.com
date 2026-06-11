import { z } from "zod";

import { Clarity, isClarityReady } from "@/lib/clarity";

const eventNames = [
  "contact_link_click",
  "content_share",
  "craft_detail_click",
  "experience_detail_click",
  "external_link_click",
  "haptics_toggle",
  "internal_link_click",
  "navbar_home_click",
  "navbar_section_click",
  "project_detail_click",
  "resume_click",
  "schedule_meet_click",
  "section_anchor_click",
  "sound_toggle",
  "tech_link_click",
  "theme_toggle",
  "toc_minimap_hover",
  "toc_minimap_item_click",
  "view_all_click",
  "view_mode_change",
] as const;

const eventPropertiesSchema = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.boolean(), z.null()])
);

const eventSchema = z.object({
  name: z.enum(eventNames),
  properties: eventPropertiesSchema.optional(),
});

export type Event = z.infer<typeof eventSchema>;
export type EventName = Event["name"];
export type Section = "projects" | "crafts" | "experience";
export type Variant = "list" | "grid";

export const trackEvent = (input: Event): void => {
  if (!isClarityReady()) {
    return;
  }

  const event = eventSchema.parse(input);
  Clarity.event(event.name);

  if (!event.properties) {
    return;
  }

  for (const [key, value] of Object.entries(event.properties)) {
    if (value === null) {
      continue;
    }

    Clarity.setTag(`${event.name}.${key}`, String(value));
  }
};

export const trackContactLinkClick = (platform: string, url: string) =>
  trackEvent({
    name: "contact_link_click",
    properties: { platform, url },
  });

export const trackContentShare = (
  title: string,
  url: string,
  method: "native" | "clipboard"
) =>
  trackEvent({
    name: "content_share",
    properties: { method, title, url },
  });

export const trackCraftDetailClick = (
  slug: string,
  title: string,
  location: "home" | "listing"
) =>
  trackEvent({
    name: "craft_detail_click",
    properties: { location, slug, title },
  });

export const trackExperienceDetailClick = (
  slug: string,
  title: string,
  location: "home" | "listing"
) =>
  trackEvent({
    name: "experience_detail_click",
    properties: { location, slug, title },
  });

export const trackExternalLinkClick = (properties: {
  context: string;
  link_type: string;
  url: string;
  slug?: string;
  title?: string;
}) =>
  trackEvent({
    name: "external_link_click",
    properties: {
      context: properties.context,
      link_type: properties.link_type,
      slug: properties.slug ?? "",
      title: properties.title ?? "",
      url: properties.url,
    },
  });

export const trackHapticsToggle = (enabled: boolean) =>
  trackEvent({
    name: "haptics_toggle",
    properties: { enabled },
  });

export const trackInternalLinkClick = (href: string, label: string) =>
  trackEvent({
    name: "internal_link_click",
    properties: { href, label },
  });

export const trackNavbarHomeClick = () =>
  trackEvent({ name: "navbar_home_click" });

export const trackNavbarSectionClick = (section: Section) =>
  trackEvent({
    name: "navbar_section_click",
    properties: { section },
  });

export const trackProjectDetailClick = (
  slug: string,
  title: string,
  location: "home" | "listing"
) =>
  trackEvent({
    name: "project_detail_click",
    properties: { location, slug, title },
  });

export const trackResumeClick = (location: string) =>
  trackEvent({
    name: "resume_click",
    properties: { location },
  });

export const trackScheduleMeetClick = () =>
  trackEvent({ name: "schedule_meet_click" });

export const trackSectionAnchorClick = (section: string) =>
  trackEvent({
    name: "section_anchor_click",
    properties: { section },
  });

export const trackSoundToggle = (enabled: boolean) =>
  trackEvent({
    name: "sound_toggle",
    properties: { enabled },
  });

export const trackTechLinkClick = (tech: string, url: string) =>
  trackEvent({
    name: "tech_link_click",
    properties: { tech, url },
  });

export const trackThemeToggle = (theme: string) =>
  trackEvent({
    name: "theme_toggle",
    properties: { theme },
  });

export const trackTocMinimapHover = () =>
  trackEvent({ name: "toc_minimap_hover" });

export const trackTocMinimapItemClick = (
  title: string,
  url: string,
  depth: number
) =>
  trackEvent({
    name: "toc_minimap_item_click",
    properties: { depth, title, url },
  });

export const trackViewAllClick = (section: Section) =>
  trackEvent({
    name: "view_all_click",
    properties: { section },
  });

export const trackViewModeChange = (section: Section, variant: Variant) =>
  trackEvent({
    name: "view_mode_change",
    properties: { section, variant },
  });
