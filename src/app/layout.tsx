import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

const altee = localFont({
  src: [
    { path: "../fonts/AlteHaasGroteskRegular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/AlteHaasGroteskBold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-altee",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${altee.variable} ${altee.className} bg-white dark:bg-ink text-ink dark:text-white transition-colors`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}