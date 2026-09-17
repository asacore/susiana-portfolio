import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { Analytics } from "@vercel/analytics/next";

const altee = localFont({
  src: [
    {
      path: "../fonts/AlteHaasGroteskRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/AlteHaasGroteskBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-altee",
});

export const metadata: Metadata = {
  title: "Susiana Salsa Putri | Graphic Designer, I/UX Designer & Web Developer",
  description:
    "Portfolio of Susiana Salsa Putri, an Information Systems graduate, Graphic Designer, UI/UX Designer, and Web Developer.",

  metadataBase: new URL("https://susiana-portfolio.vercel.app/"),

  icons: {
    icon: "/element-star.svg",
    shortcut: "/element-star.svg",
    apple: "/element-star.svg",
  },

  openGraph: {
    title: "Susiana Salsa Putri | Graphic Designer & UI/UX Designer",
    description:
      "Graphic Design, UI/UX Design, and Web Development portfolio by Susiana Salsa Putri.",
    url: "https://susiana-portfolio.vercel.app/",
    siteName: "Susiana Salsa Putri Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Susiana Salsa Putri Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Susiana Salsa Putri | Graphic Designer & UI/UX Designer",
    description:
      "Graphic Design, UI/UX Design, and Web Development portfolio by Susiana Salsa Putri.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${altee.variable} ${altee.className} bg-white dark:bg-ink text-ink dark:text-white transition-colors`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}