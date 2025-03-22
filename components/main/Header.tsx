"use client";

import Image from "next/image";
import Section from "../layout/Section";
import { motion } from "framer-motion";

const Header: React.FunctionComponent = () => {
  return (
    <Section className="flex flex-row items-center justify-start gap-4 py-6 border-b max-sm:items-start">
      <motion.div
        className="relative w-fit h-fit flex-shrink-0"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Image
          src={"/profile.jpg"}
          alt="aniket-profile"
          width={80}
          height={80}
          className="rounded-full transition-all hover:grayscale"
          priority
        />
        <motion.div
          className="absolute px-2 py-1 bg-background shadow rounded-full text-sm left-14 bottom-0 cursor-default select-none"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {"🐢"}
        </motion.div>
      </motion.div>
      <div>
        <h1 className="leading-snug font-semibold text-2xl tracking-tighter text-primary">
          👋 Hi, I am Aniket
        </h1>
        <div className="leading-snug font-normal text-base text-muted-foreground mt-1">
          <p>
            {
              "A half software engineer, full-time startup enthusiast from India📍."
            }
          </p>
          <p>{new Date().getFullYear() - 2000 + ", he/him"}</p>
        </div>
      </div>
    </Section>
  );
};

export default Header;
