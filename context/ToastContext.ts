"use client";
import { createContext } from "react";

interface ToastContextProps {
    successToast: (message: string, position?: string) => void;
    warningToast: (message: string, position?: string) => void;
    infoToast: (message: string, position?: string) => void;
    errorToast: (message: string, position?: string) => void;
    removeToast: (id: number) => void;
  }
  
export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined
);