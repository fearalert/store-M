"use client";

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogDescription,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
  
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { Button } from "./ui/button"
import { sendEmailOTP } from "@/lib/helper/helper";
import { verifySecret } from "@/lib/actions/user.action";

const OTPModal = ({
    accountId,
    email,
  }: {
    accountId: string;
    email: string;
  }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsLoading(true);
  
      console.log({ accountId, password });
  
      try {
        const sessionId = await verifySecret({ accountId, password });

        console.log({ sessionId });
  
        if (sessionId) router.push("/");
      } catch (error) {
        console.log("Failed to verify OTP", error);
      }
  
      setIsLoading(false);
    };
  
    const handleResendOtp = async () => {
      await sendEmailOTP({ email });
    };
  
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="relative flex justify-center">
            <AlertDialogTitle className="h2 text-center font-bold text-lg">
              Enter Your OTP
            </AlertDialogTitle>
            <AlertDialogDescription className="text-text-half text-center">
              We&apos;ve sent a code to{" "}
              <span className="pl-1 text-primary">{email}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
  
          <InputOTP maxLength={6} value={password} onChange={setPassword}>
            <InputOTPGroup className="flex flex-row gap-1 items-center justify-center text-center">
              <InputOTPSlot index={0} className="h-10 w-10" />
              <InputOTPSlot index={1} className="h-10 w-10" />
              <InputOTPSlot index={2} className="h-10 w-10" />
              <InputOTPSlot index={3} className="h-10 w-10" />
              <InputOTPSlot index={4} className="h-10 w-10" />
              <InputOTPSlot index={5} className="h-10 w-10" />
            </InputOTPGroup>
          </InputOTP>
  
          <AlertDialogFooter>
            <div className="flex w-full flex-col items-center gap-4">
              <AlertDialogAction
                onClick={handleSubmit}
                className="w-2/3 text-white bg-primary hover:bg-primary h-10"
                type="button"
              >
                Submit
                {isLoading && (
                  <div>Loading...</div>
                )}
              </AlertDialogAction>
  
              <div className="subtitle-2 text-center text-text-half">
                Didn&apos;t get a code?
                <Button
                  type="button"
                  variant="link"
                  className="pl-1 text-primary"
                  onClick={handleResendOtp}
                >
                  Click to resend
                </Button>
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

export default OTPModal;