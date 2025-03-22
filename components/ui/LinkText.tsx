"use client"

import { useState } from "react"
import Image from "next/image"
import { HoverCardTriggerProps } from "@radix-ui/react-hover-card"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard"

interface LinkTextProps extends HoverCardTriggerProps {
  children?: React.ReactNode
  className?: string
  preview?: boolean
}

const LinkText: React.FunctionComponent<LinkTextProps> = ({
  className,
  preview = true,
  ...attr
}) => {
  const [src, setSrc] = useState(
    attr.href
      ? `https://v1.opengraph.11ty.dev/${encodeURIComponent(attr.href)}/onerror`
      : ""
  )

  return (
    <HoverCard openDelay={500}>
      <HoverCardTrigger
        className={cn(
          "relative flex flex-row items-center justify-start gap-0.5 text-base font-medium transition-all after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:gap-1 hover:text-primary hover:after:w-full active:text-primary",
          className
        )}
        {...attr}
      >
        <span>{attr?.children}</span>
        <ArrowUpRight className="w-4" />
      </HoverCardTrigger>
      {preview && (
        <HoverCardContent side="right">
          <Image
            src={src}
            priority
            unoptimized
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt={`${attr.href} preview`}
            onError={() => {
              setSrc("https://placehold.co/1200x630?text=Preview+Not+Found")
            }}
          />
        </HoverCardContent>
      )}
    </HoverCard>
  )
}

export default LinkText
