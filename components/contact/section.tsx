import { ContactItem } from "@/components/contact/item";
import { CopyLink } from "@/components/copy-link";
import { Section } from "@/components/layout/section";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Title } from "@/components/ui/title";
import { resolveContacts } from "@/lib/contacts";
import { cn } from "@/lib/utils";

const ContactSection = async ({ className }: { className?: string }) => {
  const contacts = resolveContacts();
  const contactUrls = contacts
    .map((contact) => contact.link?.url)
    .filter(Boolean);
  const previews = await prefetchGlimpses(contactUrls);

  return (
    <Section
      className={cn(
        "delay-600 grid grid-cols-1 justify-start gap-2",
        className
      )}
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

export { ContactSection };
