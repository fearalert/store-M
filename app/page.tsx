"use client"

import { useToast } from "@/hooks/useToast";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

export default function Home() {
  // const router = useRouter();

  // useEffect(() => {
  //   router.push("/auth/login");
  // }, [router]);

  const { successToast , errorToast, warningToast, infoToast} = useToast();

  const handleSuccess = () => {
    successToast("Congrats the toast is success", "top-right")
  }

  const handleError = () => {
    errorToast("Error the toast is success", "top-left")
  }

  const handleWarning = () => {
    warningToast("Warning the toast is success", "bottom-left")
  }

  const handleInfo = () => {
    infoToast("Info the toast is Info", "bottom-right")
  }


  return (
    <>
      {/* <div>Welcome to Storage Management System</div> */}
      <div className="flex flex-col gap-2 py-12 justify-center items-center">
          <div className="font-bold">Welcome to Toaster</div>
          <button className="bg-accent-green rounded px-4 py-2 text-white font-bold" onClick={handleSuccess}>Success Toast</button>
          <button className="bg-accent-blue rounded px-4 py-2 text-white font-bold" onClick={handleInfo}>Info Toast</button>
          <button className="bg-accent-yellow rounded px-4 py-2 text-white font-bold" onClick={handleWarning}>Warning Toast</button>
          <button className="bg-accent-red rounded px-4 py-2 text-white font-bold" onClick={handleError}>Error Toast</button>
      </div>
    </>
  );
}
