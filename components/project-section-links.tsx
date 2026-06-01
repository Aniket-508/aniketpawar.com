"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { trackViewAllClick } from "@/lib/events";

const ProjectSectionLinks = () => (
  <Button variant="secondary" className="group col-span-2" asChild>
    <Link href={ROUTES.PROJECTS} onClick={() => trackViewAllClick("projects")}>
      View all
      <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:rotate-45" />
    </Link>
  </Button>
);

export { ProjectSectionLinks };
