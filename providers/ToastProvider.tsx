"use client";

import ToastsContainer from "@/components/toast/ToastContainer";
import { ToastContext } from "@/context/ToastContext";
import { actionTypes, toastReducer } from "@/reducers/ToastReducer";
import { useReducer } from "react";

const initialState = {
  toasts: [],
};

interface Props {
  children: React.ReactNode;
  defaultPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

export const ToastProvider = ({ children, defaultPosition = "top-right" }: Props) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const isValidPosition = (
    position: string | undefined
  ): position is "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center" => {
    return [
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
      "top-center",
      "bottom-center",
    ].includes(position as string);
  };
  
  const addToast = (
    type: "success" | "warning" | "info" | "error",
    message: string,
    position?: string
  ) => {
    const validPosition = isValidPosition(position) ? position : defaultPosition;
    const id = Math.floor(Math.random() * 10000000);
    dispatch({
      type: actionTypes.ADD_TOAST,
      payload: { id, message, type, position: validPosition },
    });
  };

  const successToast = (message: string, position?: string) => addToast("success", message, position);
  const warningToast = (message: string, position?: string) => addToast("warning", message, position);
  const infoToast = (message: string, position?: string) => addToast("info", message, position);
  const errorToast = (message: string, position?: string) => addToast("error", message, position);

    const removeToast = (id: number) =>
      dispatch({ type: actionTypes.DELETE_TOAST, payload: id });

    const value = { successToast, warningToast, infoToast, errorToast, removeToast };

  return (
    <ToastContext.Provider value={value}>
      {[
        ...new Set(state.toasts.map((toast) => toast.position || defaultPosition)),
      ].map((position) => (
        <ToastsContainer
          key={position}
          toasts={state.toasts.filter((toast) => toast.position === position)}
          position={position}
        />
      ))}
      {children}
    </ToastContext.Provider>
  );
};
