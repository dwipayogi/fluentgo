import { ThemeProvider } from "@/components/theme-provider";
import "../styles/globals.css";
import "@livekit/components-styles";
import "@livekit/components-styles/prefabs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FluentGo - Video Conferencing Web",
  description:
    "FluentGo is a video conferencing web app for language learning. It provides a platform for users to practice speaking and listening skills in real-time with AI-powered mentor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-indigo-50 dark:bg-zinc-950 transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <UserProvider>{children}</UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
