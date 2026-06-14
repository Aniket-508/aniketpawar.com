"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { SITE } from "@/constants/site";

export const UserAvatar = () => (
  <motion.div
    className="relative h-fit w-fit shrink-0"
    whileHover={{ scale: 1.1 }}
    transition={{ damping: 10, stiffness: 400, type: "spring" }}
  >
    <Image
      src={SITE.AUTHOR.AVATAR}
      alt="aniket-profile"
      width={60}
      height={60}
      className="rounded-full transition-all hover:grayscale"
      priority
    />
    <motion.div
      className="bg-background absolute bottom-0 left-12 cursor-default rounded-full px-1 py-0.5 text-sm shadow select-none"
      whileHover={{ scale: 1.1 }}
      transition={{ damping: 10, stiffness: 400, type: "spring" }}
    >
      {"🐢"}
    </motion.div>
  </motion.div>
);
