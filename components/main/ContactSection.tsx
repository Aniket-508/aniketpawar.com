import React from "react"

import { getContacts } from "@/lib/contacts"

import { CopyLink } from "../CopyLink"
import { IconProps } from "../Icons"
import Section from "../layout/Section"
import LinkText from "../ui/LinkText"
import Title from "../ui/Title"

interface ContactItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  icon?: (props: IconProps) => JSX.Element
  link?: {
    display?: string
    url?: string
  }
}

const ContactSection: React.FunctionComponent = () => {
  return (
    <Section className="grid grid-cols-1 justify-start gap-4 pb-6" id="socials">
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
  )
}

const ContactItem: React.FunctionComponent<ContactItemProps> = ({
  title,
  icon,
  link,
  className,
  ...attr
}) => {
  return (
    <div className={"flex flex-row items-center justify-start gap-4"} {...attr}>
      {icon && title && icon({ className: "size-4" })}
      <span>
        {link?.url && (
          <LinkText
            className="text-sm font-normal text-muted-foreground"
            href={link?.url}
            target="_blank"
          >
            {link?.display}
          </LinkText>
        )}
        {!link?.url && (
          <span className="text-sm font-normal text-muted-foreground">
            {"link not found"}
          </span>
        )}
      </span>
    </div>
  )
}

export default ContactSection

export type { ContactItemProps }
