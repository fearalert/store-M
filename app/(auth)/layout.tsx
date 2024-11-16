import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-primary p-12 lg:flex xl:w-2/5">
        <div className="flex max-w-1/2 flex-col justify-center items-center space-y-12">
          <Image
            src="/Logo.png"
            alt="logo"
            width={224}
            height={82}
            className="h-auto"
          />
          <div className="space-y-6 text-white">
            <h1 className="h1">Manage your Storage effectively</h1>
            <p className="body-1">
              A perfect place to store your documents and mange files with care.
            </p>
          </div>
          <Image
            src="/file.png"
            alt="Files"
            width={342}
            height={342}
            className="transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image
            src="/logo-blue.png"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
          />
        </div>

        {children}
      </section>
    </div>
  );
};

export default Layout;