import { ROUTES } from "@/constants/routes";
import { NAV_GROUP_LABELS, NAV_ITEMS } from "@/constants/site";
import type {
  NavDropdownSection,
  NavGroupId,
  NavItem,
  SectionId,
} from "@/types/nav";

const pushGroupSection = (
  sections: NavDropdownSection[],
  group: NavGroupId,
  items: NavItem[]
) => {
  if (items.length > 0) {
    sections.push({ group, items, type: "group" });
  }
};

export const getNavDropdownSections = (
  items: NavItem[]
): NavDropdownSection[] => {
  const sections: NavDropdownSection[] = [];
  let currentGroup: NavGroupId | undefined;
  let currentGroupItems: NavItem[] = [];

  const flushGroup = () => {
    if (currentGroup) {
      pushGroupSection(sections, currentGroup, currentGroupItems);
      currentGroup = undefined;
      currentGroupItems = [];
    }
  };

  for (const item of items) {
    if (item.group) {
      if (currentGroup && currentGroup !== item.group) {
        flushGroup();
      }

      currentGroup = item.group;
      currentGroupItems.push(item);
      continue;
    }

    flushGroup();
    sections.push({ item, type: "item" });
  }

  flushGroup();

  return sections;
};

export const getStandaloneNavItems = (items: NavItem[]): NavItem[] =>
  items.filter((item) => !item.group);

export const getNavGroupsInOrder = (
  items: NavItem[]
): { group: NavGroupId; items: NavItem[] }[] => {
  const groups = new Map<NavGroupId, NavItem[]>();

  for (const item of items) {
    if (!item.group) {
      continue;
    }

    const groupItems = groups.get(item.group) ?? [];
    groupItems.push(item);
    groups.set(item.group, groupItems);
  }

  const orderedGroups: { group: NavGroupId; items: NavItem[] }[] = [];

  for (const item of items) {
    if (
      !item.group ||
      orderedGroups.some(({ group }) => group === item.group)
    ) {
      continue;
    }

    const groupItems = groups.get(item.group);

    if (groupItems) {
      orderedGroups.push({ group: item.group, items: groupItems });
    }
  }

  return orderedGroups;
};

export const getNavGroupLabel = (group: NavGroupId): string =>
  NAV_GROUP_LABELS[group];

export const isNavGroupActive = (
  items: NavItem[],
  activeSection: SectionId | null
): boolean => items.some((item) => item.id === activeSection);

const SECTION_ROUTES: { id: SectionId; route: string }[] = [
  { id: "contact", route: ROUTES.CONTACT },
  { id: "projects", route: ROUTES.PROJECTS },
  { id: "crafts", route: ROUTES.CRAFTS },
  { id: "experiences", route: ROUTES.EXPERIENCES },
  { id: "uses", route: ROUTES.USES },
  { id: "favorites", route: ROUTES.FAVORITES },
  { id: "stats", route: ROUTES.STATS },
  { id: "colophon", route: ROUTES.COLOPHON },
  { id: "sponsor", route: ROUTES.SPONSORS },
  { id: "testimonials", route: ROUTES.TESTIMONIALS },
  { id: "writing", route: ROUTES.WRITING },
];

export const getActiveSection = (pathname: string): SectionId | null => {
  if (pathname === ROUTES.HOME) {
    return "home";
  }

  for (const { id, route } of SECTION_ROUTES) {
    if (pathname === route || pathname.startsWith(`${route}/`)) {
      return id;
    }
  }

  return null;
};

export const getHomeNavItem = (): NavItem =>
  NAV_ITEMS.find((item) => item.id === "home") ?? {
    href: ROUTES.HOME,
    id: "home",
    label: "home",
  };
