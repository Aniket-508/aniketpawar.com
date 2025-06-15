import Link from "next/link"
import { CalendarClockIcon } from "lucide-react"

import Section from "../layout/Section"
import { Button } from "../ui/Button"
import Callout from "../ui/Callout"
import LinkText from "../ui/LinkText"

const WorkTogether: React.FunctionComponent = () => {
  return (
    <Section id="work-together" className="animation-delay-500">
      <Callout className="space-y-4">
        <p>{"Interested in working together? Feel free to schedule a meet!"}</p>
        <div className="flex flex-row items-center justify-start gap-4">
          <Button asChild className="gap-1">
            <Link href="https://cal.com/aniket-pawar" target="_blank">
              Schedule a meet /{" "}
              <CalendarClockIcon className="inline sm:hidden" />
              <span className="hidden sm:inline">cal.com</span>
            </Link>
          </Button>
          <LinkText
            href={"/resume.pdf"}
            target="_blank"
            className="text-sm font-medium text-muted-foreground"
            preview={false}
          >
            {"Resume"}
          </LinkText>
        </div>
      </Callout>
    </Section>
  )
}

export default WorkTogether
