import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProposalOS — Observe before you write",
  description: "A working demo for structured job-post analysis and proposal strategy.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}