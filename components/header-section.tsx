"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Section } from "@/components/layout/section";
import { SITE } from "@/constants/site";

const HeaderSection = () => (
  <Section
    id="profile"
    className="animation-delay-100 flex flex-row items-center justify-start gap-5 pb-6 max-sm:items-start"
  >
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
    <div>
      <h1 className="text-primary text-2xl leading-snug font-semibold tracking-tighter">
        Aniket Pawar
      </h1>
      <div className="text-muted-foreground mt-1 text-base leading-snug font-normal">
        <p>Frontend Engineer</p>
      </div>
    </div>
  </Section>
);

export { HeaderSection };
