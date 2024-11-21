import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { getCurrentUser } from "@/lib/actions/user.action";
import {redirect} from "next/navigation";

export const dynamic = "force-dynamic";

const Layout = async({ children }: { children: React.ReactNode }) => {

  const currentUser = await getCurrentUser();
  if(!currentUser) return redirect("/auth/login");

  return (
    <div className="flex min-h-screen">
        <Sidebar {...currentUser}/>
        <section className="w-full bg-slate-200">
          <div className="md:hidden">
            <MobileNavigation {...currentUser}/>
          </div>
          <Header />
          <main className="p-4">{children}</main>
        </section>
    </div>
  );
};

export default Layout;