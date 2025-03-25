import '../styles/globals.css';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "FluentGo - Video Conferencing Web",
  description: 'FluentGo is a video conferencing web app built using LiveKit and Next.js.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
