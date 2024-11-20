import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/useToast";
import Image from "next/image";
import errorIcon from "/public/assets/icons/error.svg";
import successIcon from "/public/assets/icons/success.svg";
import warningIcon from "/public/assets/icons/warning.svg";
import infoIcon from "/public/assets/icons/info.svg";

interface ToastProps {
  id: number;
  message: string;
  type: "success" | "warning" | "info" | "error";
}

const toastTypes = {
  success: {
    image: (
      <Image className="text-white" src={successIcon} alt={"Success-icon"} width={24} height={24} />
    ),
    background: "bg-accent-green",
    textColor: "text-white dark:text-black",
    sideColor: "bg-dark-green",
    toastName: "Success",
  },
  warning: {
    image: (
      <Image 
      src={warningIcon} alt={"Warning-icon"} width={24} height={24} />
    ),
    background: "bg-accent-yellow",
    textColor: "text-white dark:text-black",
    sideColor: "bg-dark-yellow",
    toastName: "Warning",
  },
  info: {
    image: <Image className="text-white rounded-full" 
            src={infoIcon} alt={"Info-icon"} width={24} height={24} />,
    background: "bg-accent-blue",
    textColor: "text-white dark:text-black",
    sideColor: "bg-dark-blue",
    toastName: "Info",
  },
  error: {
    image: <Image src={errorIcon} alt={"alert-icon"} width={24} height={24} />,
    background: "bg-accent-red",
    textColor: "text-white dark:text-black",
    sideColor: "bg-dark-red",
    toastName: "Error",
  },
};

const Toast = ({ message, type, id }: ToastProps) => {
  const { toastName, background, sideColor, textColor } = toastTypes[type];
  const toast = useToast();
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const handleDismiss = () => {
    toast.removeToast(id);
  };

  useEffect(() => {
    timerID.current = setTimeout(() => {
      handleDismiss();
    }, 4000);
    return () => {
      if (timerID.current) {
        clearTimeout(timerID.current);
      }
    };
  });

  return (
    <div className={`relative ${background} rounded-md shadow-md flex flex-row z-9999 items-center w-full min-w-[300px] max-w-[500px] h-auto`}>
        <div className={`${sideColor} absolute rounded-l left-0 top-0 bottom-0 w-2 1`}>
        </div>
      <div className={`flex flex-col items-start text-white text-center gap-1 px-6 py-4`}>
        {/* <span>{image}</span> */}
        <p className={`${textColor} text-lg font-bold`}>{toastName}</p>
        <p className={`${textColor} text-md font-medium`}>{message}</p>
      </div>

      <button
        className="absolute top-4 right-2 rounded-full mx-2 bg-none hover:bg-secondary focus:outline-none"
        onClick={handleDismiss}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${textColor}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
