import {
  ClerkProvider,
} from "@clerk/nextjs";
import "../styles/globals.css";
import "@livekit/components-styles";
import "@livekit/components-styles/prefabs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FluentGo - Video Conferencing Web",
  description:
    "FluentGo is a video conferencing web app built using LiveKit and Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} scroll-smooth`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
