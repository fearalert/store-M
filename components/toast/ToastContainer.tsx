import React from "react";
import Toast from "./Toast";


interface Toast {
  id: number;
  message: string;
  type: "success" | "warning" | "info" | "error";
}

interface ToastsContainerProps {
  toasts: Toast[];
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

const ToastsContainer = ({ toasts, position = "bottom-right"}: ToastsContainerProps) => {

    const positionClasses = {
        "top-left": "top-4 left-4",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "top-center": "top-4 left-1/2 transform -translate-x-1/2",
        "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
      };

  return (
   <div className={`fixed flex flex-col gap-3 z-10 ${positionClasses[position]}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};


export default ToastsContainer;
