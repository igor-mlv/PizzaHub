import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/shared/components/shared/header";
import {Suspense} from "react";

export const metadata: Metadata = {
  title: "Pizza Hub",
  description: "Created by Igor Malov",
};

export default function HomeLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
      <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
