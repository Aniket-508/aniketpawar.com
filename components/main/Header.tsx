"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import Section from "../layout/Section"

const Header: React.FunctionComponent = () => {
  return (
    <Section
      id="profile"
      className="animation-delay-100 flex flex-row items-center justify-start gap-4 pb-6 max-sm:items-start"
    >
      <motion.div
        className="relative h-fit w-fit flex-shrink-0"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Image
          src={"/profile.jpg"}
          alt="aniket-profile"
          width={64}
          height={64}
          className="rounded-full transition-all hover:grayscale"
          priority
        />
        <motion.div
          className="bg-background absolute bottom-0 left-12 cursor-default rounded-full px-1 py-0.5 text-sm shadow select-none"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {"🐢"}
        </motion.div>
      </motion.div>
      <div>
        <h1 className="text-primary text-2xl leading-snug font-semibold tracking-tighter">
          Hi, I am Aniket 👋
        </h1>
        <div className="text-muted-foreground mt-1 text-base leading-snug font-normal">
          {/* <p>
            {
              "A half software engineer, full-time startup enthusiast from India📍"
            }
          </p> */}
          <p>Senior Frontend Engineer</p>
        </div>
      </div>
    </Section>
  )
}

export default Header
