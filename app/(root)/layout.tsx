import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { getCurrentUser } from "@/lib/actions/user.action";
import {redirect} from "next/navigation";

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        console.warn("No current user. Redirecting to login.");
        return redirect("/auth/login");
    }

    return (
        <div className="flex h-screen max-h-auto overflow-y-scroll">
            <Sidebar {...currentUser} />
            <section className="w-full bg-slate-100">
                <div className="md:hidden">
                    <MobileNavigation {...currentUser} />
                </div>
                <Header {...currentUser} />
                <main className="remove-scrollbar h-full flex-1 overflow-auto bg-slate-100 px-5 py-7 md:px-9 md:py-10">
                    {children}
                </main>
            </section>
        </div>
    );
};

export default Layout;