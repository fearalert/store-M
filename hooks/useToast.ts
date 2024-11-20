import { ToastContext } from "@/context/ToastContext";
import { useContext } from "react";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }
  return context;
};

