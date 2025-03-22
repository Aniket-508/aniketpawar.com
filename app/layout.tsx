import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { MAIN_METADATA } from "@/lib/meta";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import Script from "next/script";

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
  title: MAIN_METADATA.TITLE,
  description: MAIN_METADATA.DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: MAIN_METADATA.SITE_NAME,
    url: MAIN_METADATA.URL,
    title: MAIN_METADATA.TITLE,
    description: MAIN_METADATA.DESCRIPTION,
    images: MAIN_METADATA.IMAGE,
  },
  twitter: {
    card: "summary",
    title: MAIN_METADATA.TITLE,
    description: MAIN_METADATA.DESCRIPTION,
    images: MAIN_METADATA.IMAGE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${instrument_serif.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.CLARITY_PROJECT_ID}");
          `}
        </Script>
      </body>
    </html>
  );
}
