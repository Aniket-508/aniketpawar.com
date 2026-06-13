import type { IconProps } from "@/components/icons";
import { Icons } from "@/components/icons";
import { CONTACTS } from "@/constants/contacts";
import type { Contact, ContactIconKey } from "@/types/contacts";

const CONTACT_ICONS: Record<
  ContactIconKey,
  (props: IconProps) => React.JSX.Element
> = {
  discord: Icons.discord,
  github: Icons.github,
  linkedin: Icons.linkedin,
  peerlist: Icons.peerlist,
  topmate: Icons.topmate,
  x: Icons.x,
};

export type ResolvedContact = Omit<Contact, "icon"> & {
  icon: (props: IconProps) => React.JSX.Element;
};

export const resolveContacts = (): ResolvedContact[] =>
  CONTACTS.map((contact) => ({
    ...contact,
    icon: CONTACT_ICONS[contact.icon],
  }));
