"use client";

import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Title } from "@/components/ui/title";
import { UserAvatar } from "@/components/user-avatar";
import { SITE } from "@/constants/site";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";

const GREETINGS = [
  "Hello",
  "Bonjour",
  "स्वागत है",
  "नमस्कार",
  "Ciao",
  "Olá",
  "おい",
  "Hallå",
  "Guten tag",
] as const;
const GREETING_DURATION_MS = 180;
const IDENTITY_HOLD_MS = 600;
const PROFILE_LAYOUT_DURATION_SECONDS = 0.65;
const CURTAIN_DELAY_SECONDS = 0.78;
const CURTAIN_DURATION_SECONDS = 0.28;
const DETAIL_DELAY_SECONDS = 0.58;
const DETAIL_DURATION_SECONDS = 0.18;
const ROLE_STAGGER_SECONDS = 0.06;
const PROFILE_AVATAR_LAYOUT_ID = "home-profile-avatar";
const PROFILE_NAME_LAYOUT_ID = "home-profile-name";

const profileLayoutTransition = {
  duration: PROFILE_LAYOUT_DURATION_SECONDS,
  ease: [0.77, 0, 0.175, 1],
  type: "tween",
} as const;

const curtainTransition = {
  delay: CURTAIN_DELAY_SECONDS,
  duration: CURTAIN_DURATION_SECONDS,
  ease: [0.23, 1, 0.32, 1],
  type: "tween",
} as const;

const detailTransition = {
  delay: DETAIL_DELAY_SECONDS,
  duration: DETAIL_DURATION_SECONDS,
  ease: [0.23, 1, 0.32, 1],
  type: "tween",
} as const;

const roleTransition = {
  ...detailTransition,
  delay: DETAIL_DELAY_SECONDS + ROLE_STAGGER_SECONDS,
} as const;

type IntroPhase = "greetings" | "identity" | "profile";

interface ProfileHeaderProps {
  shouldReduceMotion: boolean;
}

const ProfileHeader = ({ shouldReduceMotion }: ProfileHeaderProps) => (
  <div className="relative z-100 flex items-center gap-5">
    <div>
      <UserAvatar
        layoutId={PROFILE_AVATAR_LAYOUT_ID}
        layoutTransition={profileLayoutTransition}
      />
    </div>
    <div>
      <Title className="font-sans tracking-tight whitespace-nowrap">
        <motion.span
          layoutId={PROFILE_NAME_LAYOUT_ID}
          className="inline-block"
          transition={{ layout: profileLayoutTransition }}
        >
          Aniket
        </motion.span>{" "}
        <motion.span
          className="inline-block"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, transform: "translate3d(0, 2px, 0)" }
          }
          animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
          transition={detailTransition}
        >
          Pawar
        </motion.span>
      </Title>
      <motion.p
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, transform: "translate3d(0, 4px, 0)" }
        }
        animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
        transition={roleTransition}
        className="text-muted-foreground mt-1 text-base leading-snug font-normal"
      >
        Frontend Engineer
      </motion.p>
    </div>
  </div>
);

const IntroProfile = () => {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<IntroPhase>("greetings");
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const visiblePhase = shouldReduceMotion ? "profile" : phase;
  const shouldLockScroll = !(shouldReduceMotion || isIntroComplete);

  useLockBodyScroll(shouldLockScroll);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const timers = GREETINGS.slice(1).map((_, index) =>
      window.setTimeout(
        () => setGreetingIndex(index + 1),
        (index + 1) * GREETING_DURATION_MS
      )
    );
    const identityStart = GREETINGS.length * GREETING_DURATION_MS;

    timers.push(
      window.setTimeout(() => setPhase("identity"), identityStart),
      window.setTimeout(
        () => setPhase("profile"),
        identityStart + IDENTITY_HOLD_MS
      )
    );

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, [shouldReduceMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="home-profile-intro">
        <div>
          {visiblePhase === "profile" ? null : (
            <Image
              src={SITE.AUTHOR.AVATAR}
              alt=""
              width={60}
              height={60}
              aria-hidden="true"
              className="pointer-events-none fixed size-px opacity-0"
              priority
            />
          )}

          <AnimatePresence
            initial={false}
            onExitComplete={() => setIsIntroComplete(true)}
          >
            {visiblePhase === "profile" ? null : (
              <motion.div
                key="intro-backdrop"
                data-intro-backdrop=""
                aria-hidden="true"
                className="bg-background pointer-events-auto fixed -inset-1 z-80 touch-none will-change-transform"
                exit={{ transform: "translate3d(0, -100%, 0)" }}
                transition={curtainTransition}
              />
            )}
          </AnimatePresence>

          {visiblePhase === "greetings" ? (
            <p
              aria-hidden="true"
              className="text-foreground pointer-events-none fixed inset-0 z-90 flex items-center justify-center gap-1.5 text-2xl leading-snug font-semibold tracking-tight"
            >
              <span className="size-1.5 rounded-full bg-current" />
              <span>{GREETINGS[greetingIndex]}</span>
            </p>
          ) : null}

          {visiblePhase === "identity" ? (
            <div
              aria-hidden="true"
              className="text-foreground pointer-events-none fixed inset-0 z-90 flex items-center justify-center gap-2 text-2xl leading-snug tracking-tight"
            >
              <span className="font-medium">I’m</span>
              <UserAvatar
                layoutId={PROFILE_AVATAR_LAYOUT_ID}
                layoutTransition={profileLayoutTransition}
                size={38}
              />
              <motion.span
                layoutId={PROFILE_NAME_LAYOUT_ID}
                className="inline-block font-semibold"
                transition={{ layout: profileLayoutTransition }}
              >
                Aniket
              </motion.span>
            </div>
          ) : null}

          {visiblePhase === "profile" ? (
            <ProfileHeader shouldReduceMotion={Boolean(shouldReduceMotion)} />
          ) : null}
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
};

export { IntroProfile };
