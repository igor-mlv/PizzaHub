import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/shared/components/shared/header";
import { Suspense } from "react";
import { Title } from "@/shared/components";

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
      <div className="lg:block hidden ">
        <Suspense>
          <Header />
        </Suspense>
        {children}
        {modal}
      </div>

      {/* Show a message to users that this website works only on a laptop view */}
      <div className="lg:hidden w-full h-[80vh] flex justify-center items-center">
        <div className="flex flex-col gap-5 items-center">
          <Title text={"Pizza Hub"} size="lg" />
          <Title text={"For the best experience, please view this website on a laptop."} size="sm" className="text-center" />
        </div>
      </div>

    </main>
  );
}
