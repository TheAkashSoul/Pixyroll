import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pixyroll",
  description: "Pixyroll image gallary app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <Provider>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
