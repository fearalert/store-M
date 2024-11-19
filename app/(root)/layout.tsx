import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
        <Sidebar />
      <section className="w-full bg-slate-200">
        <MobileNavigation />
        <Header />
        <main className="p-4">{children}</main>
      </section>
    </div>
  );
};

export default Layout;