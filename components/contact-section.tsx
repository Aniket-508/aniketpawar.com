import React from "react";

import { CopyLink } from "@/components/copy-link";
import { Section } from "@/components/layout/section";
import { AppLink } from "@/components/ui/app-link";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Title } from "@/components/ui/title";
import { resolveContacts } from "@/lib/contacts";
import type { ResolvedContact } from "@/lib/contacts";
import { cn } from "@/lib/utils";

interface ContactItemProps
  extends ResolvedContact, Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  preview?: GlimpseData | null;
}

const ContactItem = ({
  title,
  icon,
  link,
  preview,
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
        <AppLink
          className="text-muted-foreground text-sm font-normal"
          href={link?.url}
          target="_blank"
          external
          preview={preview}
          eventName="contact_link_click"
          eventProperties={{ platform: title, url: link.url }}
        >
          {link?.display}
        </AppLink>
      )}
      {!link?.url && (
        <span className="text-muted-foreground text-sm font-normal">
          {"link not found"}
        </span>
      )}
    </span>
  </div>
);

const ContactSection = async () => {
  const contacts = resolveContacts();
  const contactUrls = contacts
    .map((contact) => contact.link?.url)
    .filter(Boolean);
  const previews = await prefetchGlimpses(contactUrls);

  return (
    <Section
      className="delay-600 grid grid-cols-1 justify-start gap-2"
      id="socials"
    >
      <span className="group/social flex items-center gap-1">
        <Title
          className="text-xl font-medium italic"
          render={<h2>{"socials."}</h2>}
        />
        <CopyLink
          title={"Socials"}
          className="hidden group-hover/social:inline-flex"
        />
      </span>
      <Section className="group grid grid-cols-1 justify-start p-0">
        {contacts.map((contact, contactIndex) => (
          <ContactItem
            {...contact}
            key={contactIndex}
            preview={previews[contact.link?.url]}
          />
        ))}
      </Section>
    </Section>
  );
};

export { ContactSection, type ContactItemProps };
