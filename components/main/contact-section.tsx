import React from "react";

import { getContacts } from "@/lib/contacts";

import { CopyLink } from "../copy-link";
import type { IconProps } from "../icons";
import Section from "../layout/section";
import LinkText from "../ui/link-text";
import Title from "../ui/title";

interface ContactItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  icon?: (props: IconProps) => React.JSX.Element;

  link?: {
    display?: string;
    url?: string;
  };
}

const ContactItem: React.FunctionComponent<ContactItemProps> = ({
  title,
  icon,
  link,
  className: _className,
  ...attr
}) => (
  <div className={"flex flex-row items-center justify-start gap-4"} {...attr}>
    {icon && title && icon({ className: "size-4" })}
    <span>
      {link?.url && (
        <LinkText
          className="text-muted-foreground text-sm font-normal"
          href={link?.url}
          target="_blank"
        >
          {link?.display}
        </LinkText>
      )}
      {!link?.url && (
        <span className="text-muted-foreground text-sm font-normal">
          {"link not found"}
        </span>
      )}
    </span>
  </div>
);

const ContactSection: React.FunctionComponent = () => (
  <Section
    className="animation-delay-1100 grid grid-cols-1 justify-start gap-4 pb-6"
    id="socials"
  >
    <span className="group/social flex items-center space-x-2">
      <Title>{"socials."}</Title>
      <CopyLink
        title={"Socials"}
        className="hidden size-4 group-hover/social:inline"
      />
    </span>
    <Section className="grid grid-cols-1 justify-start gap-4 p-0">
      {getContacts()?.map((contact, contactIndex) => (
        <ContactItem {...contact} key={contactIndex} />
      ))}
    </Section>
  </Section>
);

export default ContactSection;

export type { ContactItemProps };
