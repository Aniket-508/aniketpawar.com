"use client";

import React from "react";

import { CopyLink } from "@/components/copy-link";
import { Section } from "@/components/layout/section";
import { LinkTextClient } from "@/components/ui/link-text/client";
import { Title } from "@/components/ui/title";
import { resolveContacts } from "@/lib/contacts";
import type { ResolvedContact } from "@/lib/contacts";
import { trackContactLinkClick } from "@/lib/events";
import { cn } from "@/lib/utils";

interface ContactItemProps
  extends
    ResolvedContact,
    Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {}

const ContactItem = ({
  title,
  icon,
  link,
  className,
  ...attr
}: ContactItemProps) => (
  <div
    className={cn(
      "py-2 flex items-center justify-start gap-4 transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30",
      className
    )}
    {...attr}
  >
    {icon && title && icon({ className: "size-4" })}
    <span>
      {link?.url && (
        <LinkTextClient
          className="text-muted-foreground text-sm font-normal"
          href={link?.url}
          target="_blank"
          onClick={() => trackContactLinkClick(title, link.url)}
        >
          {link?.display}
        </LinkTextClient>
      )}
      {!link?.url && (
        <span className="text-muted-foreground text-sm font-normal">
          {"link not found"}
        </span>
      )}
    </span>
  </div>
);

const ContactSection = () => (
  <Section
    className="delay-600 grid grid-cols-1 justify-start gap-2"
    id="socials"
  >
    <span className="group/social flex items-center gap-1">
      <Title>{"socials."}</Title>
      <CopyLink
        title={"Socials"}
        className="hidden group-hover/social:inline-flex"
      />
    </span>
    <Section className="group grid grid-cols-1 justify-start p-0">
      {resolveContacts().map((contact, contactIndex) => (
        <ContactItem {...contact} key={contactIndex} />
      ))}
    </Section>
  </Section>
);

export { ContactSection, type ContactItemProps };
