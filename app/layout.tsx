import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import "@/styles/globals.css";

import { Analytics } from "@/components/analytics";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { TooltipProvider } from "@/components/ui/tooltip";
import { META_THEME_COLORS } from "@/constants/site";
import { HapticsProvider } from "@/providers/haptics-provider";
import { SoundProvider } from "@/providers/sound-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { JsonLdScripts } from "@/seo/json-ld";
import { baseMetadata } from "@/seo/metadata";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geist_mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});

const instrument_serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
});

export const viewport: Viewport = {
  initialScale: 1,
  themeColor: META_THEME_COLORS.light,
  viewportFit: "cover",
  width: "device-width",
};

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLdScripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body
        className={`overscroll-none font-sans flex flex-col min-h-screen ${geist.variable} ${geist_mono.variable} ${instrument_serif.variable}`}
      >
        <ThemeProvider>
          <Analytics projectId={process.env.CLARITY_PROJECT_ID} />
          <TooltipProvider>
            <SoundProvider>
              <HapticsProvider>
                <div className="pointer-events-none fixed top-0 left-0 z-50 h-12 w-full to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]" />
                <Container className="pt-20 pb-14">{children}</Container>
                <Footer />
                <ScrollToTop />
              </HapticsProvider>
            </SoundProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
