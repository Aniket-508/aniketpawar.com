"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Section } from "@/lib/events";
import { trackViewAllClick } from "@/lib/events";

export const ViewAllButton = ({
  href,
  eventName,
}: {
  href: string;
  eventName: Section;
}) => (
  <Button
    variant="secondary"
    className="group col-span-2"
    nativeButton={false}
    render={<Link href={href} onClick={() => trackViewAllClick(eventName)} />}
  >
    View all
    <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:rotate-45" />
  </Button>
);
