"use client";

import { authClient } from "@/lib/auth-client"; //import the auth client
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().min(6, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SignUpView() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [error, seterror] = useState<string | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    seterror(null);
    setloading(true);
    authClient.signUp.email(
      {
        name: data.name,
        // This is the email field, which is used for sign-in
        email: data.email,
        password: data.password,
        callbackURL: "/", // Redirect URL after sign-up
      },
      {
        onSuccess: () => {
          setloading(false);
          seterror(null);
          
        },
        onError: (ctx) => {
          setloading(false);
          seterror(ctx.error.message);
        },
      }
    );
  };

  const onSocial = (provider: "google" | "github") => {
    seterror(null);
    setloading(true);
    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/", // Redirect URL after sign-up
      },
      {
        onSuccess: () => {
          setloading(false);
          seterror(null);
          router.push("/"); // Redirect to home page after successful sign-up
        },
        onError: (ctx) => {
          setloading(false);
          seterror(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">
                    Lets&apos;s get started
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Create your account to access all features
                  </p>
                </div>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="name"
                            placeholder="eg. Mohan Kumar"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="name@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="*********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Confirm your password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="*********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircleIcon className="h-4 w-4" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}

                <Button
                  disabled={loading}
                  className="w-full mt-4 cursor-pointer"
                  type="submit"
                >
                  Sign-up
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t mt-3">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button
                    disabled={loading}
                    variant="outline"
                    className="w-full cursor-pointer"
                    type="button"
                    onClick={() => onSocial("google")}
                  >
                    <Image
                      src="/google.svg"
                      alt="Google"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Google
                  </Button>
                  <Button
                    disabled={loading}
                    variant="outline"
                    className="w-full cursor-pointer"
                    type="button"
                    onClick={() => onSocial("github")}
                  >
                    <Image
                      src="/github.svg"
                      alt="GitHub"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    GitHub
                  </Button>
                </div>

                <div className="text-center text-sm mt-4">
                  <p className="text-sm text-muted-foreground mt-4">
                    Already have account?{" "}
                    <Link href="/sign-in" className="font-bold">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </Form>

          <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]" />
            <p className="text-3xl font-bold select-none text-sidebar-foreground">SAAS.AI</p>
          </div>
        </CardContent>
      </Card>

      <div>
        <p className="text-center text-sm text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="font-bold underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-bold underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default SignUpView;
