import React from "react";
import Section from "../layout/Section";
import LinkText from "../ui/LinkText";
import { getContacts } from "@/lib/contacts";

interface ContactItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  link?: {
    display?: string;
    url?: string;
  };
}

const ContactSection: React.FunctionComponent = () => {
  return (
    <Section className="grid grid-cols-1 justify-start gap-4" id="socials">
      <h2 className="leading-snug font-medium text-base text-zinc-900">
        {"socials."}
      </h2>
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
  link,
  className,
  ...attr
}) => {
  return (
    <div className={"flex flex-row items-center justify-start gap-4"} {...attr}>
      <span className="font-normal text-sm">{title}</span>
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
