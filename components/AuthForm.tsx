"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"
import { createUserAccount, loginUser } from "@/lib/actions/user.action"
import OTPModal from "./OtpModal"
import { useRouter } from "next/navigation"

type AuthFormtype = "login" | "register"

const authFormSchema = (type: "register" | "login") => {
  return z
    .object({
      email: z.string().email(),
      fullName:
        type === "register"
          ? z.string().min(2, "Full name must be at least 2 characters.").max(30, "Full name must be at most 30 characters.")
          : z.string().optional(),
      // password: z
      //   .string()
      //   .min(6, "Password must be at least 6 characters.")
      //   .max(16, "Password must be at most 16 characters.")
      //   .regex(
      //     passwordRegex,
      //     "Password must contain at least one letter, one number, and one special character."
      //   ),
      // confirmPassword:
      //   type === "register"
      //     ? z.string().min(6, "Password must be at least 6 characters.")
      //     : z.string().optional(),
    })
    // .refine(
    //   (data) => type !== "register" || data.password === data.confirmPassword,
    //   {
    //     message: "Passwords must match.",
    //     path: ["confirmPassword"],
    //   }
    // );
};

const AuthForm = ({type}: {type: AuthFormtype}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [accountId, setAccountId] = useState<number | null>(null);

    const router = useRouter();

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          fullName: "",
        },
    });
     
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true);
      setError("");
  
      try {
        if (type === "register") {
          const user = await createUserAccount({
            fullName: values.fullName || "",
            email: values.email,
          });
          setAccountId(user.accountId);
        } else {
          const user = await loginUser({ email: values.email });
          setAccountId(user.accountId);
        }
        console.log("account id", accountId);
      } catch (error) {
        console.log(error)
        const errorMessage =
          error instanceof Error ? error.message : "Something went wrong. Please try again.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    
    return (
    <>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "login" ? "Log In" : "Register"}
          </h1>
          {type === "register" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex w-full flex-col justify-center rounded-xl">
                    <FormLabel className="text-text-half py-2 body-2 w-full !important">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="border w-full shadow-none px-2 placeholder:text-text-half !important"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-accent-red ml-2 !important" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                  <div className="flex w-full flex-col justify-center rounded-xl">
                    <FormLabel className="text-text-half py-2 body-2 w-full !important">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="border w-full shadow-none px-2 placeholder:text-text-half !important"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-accent-red ml-4 !important" />
                </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                  <div className="flex w-full flex-col justify-center rounded-xl">
                    <FormLabel className="text-text-half py-2 body-2 w-full !important">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        className="border w-full shadow-none px-2 placeholder:text-text-half !important"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-accent-red ml-4 !important" />
                </FormItem>
            )}
          />

          {type === "register" && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="flex w-full flex-col justify-center rounded-xl">
                    <FormLabel className="text-text-half py-2 body-2 w-full !important">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Re-Enter your password"
                        className="border w-full shadow-none px-2 placeholder:text-text-half !important"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-accent-red ml-2 !important" />
                </FormItem>
              )}
            />
          )} */}

          <br />
          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
          >
            {type === "login" ? "Sign In" : "Sign Up"}

          </Button>

          {error && <p className="text-accent-red">*{error}</p>}

          <div className="body-2 flex justify-center">
            <p className="text-text-half">
              {type === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "login" ? "/auth/register" : "/auth/login"}
              className="ml-1 font-medium text-primary"
            >
              {" "}
              {type === "login" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
      {accountId && (
        <OTPModal email={form.getValues("email")} accountId={JSON.stringify(accountId)} />
      )}
    </>
  );
}

export default AuthForm;
