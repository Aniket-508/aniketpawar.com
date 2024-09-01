import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrument_serif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Aniket Pawar",
  description:
    "Hey! I'm Aniket Pawar. A passionate student developer who enjoys making impactful projects on the web, mobile and in real life.",
  openGraph: {
    type: "website",
    url: "https://aniket-pawar.vercel.app/",
    title: "Aniket Pawar",
    description:
      "Hey! I'm Aniket Pawar. A passionate student developer who enjoys making impactful projects on the web, mobile and in real life.",
    images:
      "https://ik.imagekit.io/2oajjadqkz/portfolio-image.png?updatedAt=1708090929752",
  },
  twitter: {
    card: "summary",
    title: "Aniket Pawar",
    description:
      "Hey! I'm Aniket Pawar. A passionate student developer who enjoys making impactful projects on the web, mobile and in real life.",
    images:
      "https://ik.imagekit.io/2oajjadqkz/portfolio-image.png?updatedAt=1708090929752",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrument_serif.variable}`}>
        {children}
      </body>
    </html>
  );
}
