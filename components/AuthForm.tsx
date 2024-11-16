/* eslint-disable @typescript-eslint/no-unused-vars */
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
type AuthFormtype = "login" | "register"

const authFormSchema = (type: AuthFormtype) => {
    return z.object({
      email: z.string().email(),
      fullName:
        type === "register"
          ? z.string().min(2).max(50)
          : z.string().optional(),
    });
  }

const AuthForm = ({type}: {type: AuthFormtype}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [accountId, setAccountId] = useState<number | null>(null);

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
    
        // try {
        //   const user =
        //     type === "login"
        //       ? await createAccount({
        //           fullName: values.fullName || "",
        //           email: values.email,
        //         })
        //       : await signInUser({ email: values.email });
    
        //   setAccountId(user.accountId);
        // } catch {
        //   setError("Failed to create account. Please try again.");
        // } finally {
        //   setIsLoading(false);
        // }
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
                  <div className="flex w-full h-20 flex-col justify-center rounded-xl">
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
                  <div className="flex w-full h-20 flex-col justify-center rounded-xl">
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

          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
          >
            {type === "login" ? "Sign In" : "Sign Up"}

          </Button>

          {error && <p className="error-message">*{error}</p>}

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
    </>
  );
}

export default AuthForm;