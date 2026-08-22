"use client";

import type { Transition } from "motion/react";
import { motion } from "motion/react";
import Image from "next/image";

import { SITE } from "@/constants/site";

interface UserAvatarProps {
  layoutId?: string;
  layoutTransition?: Transition;
  size?: number;
}

export const UserAvatar = ({
  layoutId,
  layoutTransition,
  size = 60,
}: UserAvatarProps) => (
  <motion.div
    className="relative h-fit w-fit shrink-0"
    layoutId={layoutId}
    style={{ height: size, width: size }}
    transition={{ layout: layoutTransition }}
  >
    <Image
      src={SITE.AUTHOR.AVATAR}
      alt="Portrait of Aniket Pawar"
      width={size}
      height={size}
      className="size-full rounded-full object-cover"
      priority
    />
  </motion.div>
);
