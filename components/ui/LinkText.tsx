import { HoverCardTriggerProps } from "@radix-ui/react-hover-card"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Glimpse,
  GlimpseContent,
  GlimpseDescription,
  GlimpseImage,
  GlimpseTitle,
  GlimpseTrigger,
} from "./glimpse"
import { glimpse } from "./glimpse/server"

interface LinkTextProps extends HoverCardTriggerProps {
  children?: React.ReactNode
  className?: string
  preview?: boolean
}

const LinkText: React.FunctionComponent<LinkTextProps> = async ({
  className,
  preview = true,
  href,
  ...attr
}) => {
  let data

  if (preview && href) {
    data = await glimpse(href)
  }

  return (
    <Glimpse openDelay={500}>
      <GlimpseTrigger
        className={cn(
          "relative flex flex-row items-center justify-start gap-0.5 text-base font-medium transition-all after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:gap-1 hover:text-primary hover:after:w-full active:text-primary",
          className
        )}
        {...attr}
      >
        <span>{attr?.children}</span>
        <ArrowUpRight className="w-4" />
      </GlimpseTrigger>
      {preview && data && (
        <GlimpseContent side="right" className="w-80">
          <GlimpseImage
            src={
              data.image ??
              "https://placehold.co/1200x630?text=Preview+Not+Found"
            }
          />
          <GlimpseTitle>{data.title}</GlimpseTitle>
          <GlimpseDescription>{data.description}</GlimpseDescription>
        </GlimpseContent>
      )}
    </Glimpse>
  )
}

export default LinkText
