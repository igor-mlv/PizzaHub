import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/shared/header";

export const metadata: Metadata = {
  title: "Pizza Hub",
  description: "Created by Igor Malov",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
