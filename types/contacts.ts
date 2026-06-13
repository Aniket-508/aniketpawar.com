export type ContactIconKey =
  | "github"
  | "linkedin"
  | "x"
  | "topmate"
  | "peerlist"
  | "discord";

export interface ContactLink {
  display: string;
  url: string;
}

export interface Contact {
  title: string;
  icon: ContactIconKey;
  link: ContactLink;
}
