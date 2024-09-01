import React from "react";
import Section from "../layout/Section";
import LinkText from "../ui/LinkText";
import { getContacts } from "@/lib/contacts";
import Title from "../ui/Title";

interface ContactItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  icon?: string;
  link?: {
    display?: string;
    url?: string;
  };
}

const ContactSection: React.FunctionComponent = () => {
  return (
    <Section className="grid grid-cols-1 justify-start gap-4" id="socials">
      <Title>{"socials."}</Title>
      <Section className="mt-4 grid grid-cols-1 justify-start gap-4">
        {getContacts()?.map((contact, contactIndex) => (
          <ContactItem {...contact} key={contactIndex} />
        ))}
      </Section>
    </Section>
  );
};

const ContactItem: React.FunctionComponent<ContactItemProps> = ({
  title,
  icon,
  link,
  className,
  ...attr
}) => {
  return (
    <div className={"flex flex-row items-center justify-start gap-4"} {...attr}>
      <img src={icon} alt={title} className="w-4 h-4" />
      <span>
        {link?.url && (
          <LinkText
            className="text-sm font-normal text-zinc-500"
            href={link?.url}
            target="_blank"
          >
            {link?.display}
          </LinkText>
        )}
        {!link?.url && (
          <span className="text-sm font-normal text-zinc-500">
            {"link not found"}
          </span>
        )}
      </span>
    </div>
  );
};

export default ContactSection;

export type { ContactItemProps };
