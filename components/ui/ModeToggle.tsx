"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "../ui/Button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)()
      const now = audioContext.currentTime
      const duration = 0.015 // Very short duration for a sharp click (15ms)

      // Create a combination of frequencies for a mechanical click sound
      const frequencies = [1200, 1800] // Higher frequencies for a sharper click

      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = freq
        oscillator.type = "square" // Square wave for a more mechanical sound

        // Sharp attack and quick exponential decay
        const volume = index === 0 ? 0.15 : 0.08 // First frequency louder
        gainNode.gain.setValueAtTime(0, now)
        gainNode.gain.linearRampToValueAtTime(volume, now + 0.001) // Instant attack
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration) // Quick decay

        oscillator.start(now)
        oscillator.stop(now + duration)
      })
    } catch (error) {
      // Silently fail if audio context is not available
      // (e.g., in some browsers or if autoplay is blocked)
    }
  }

  const toggleTheme = () => {
    playClickSound()
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-6"
      onClick={toggleTheme}
      title="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 3l0 18" />
        <path d="M12 9l4.65 -4.65" />
        <path d="M12 14.3l7.37 -7.37" />
        <path d="M12 19.6l8.85 -8.85" />
      </svg>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
