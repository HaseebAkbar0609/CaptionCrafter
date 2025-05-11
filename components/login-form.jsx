"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginWithEmail, signInWithGoogle } from "@/utils/firebase_auth";

import "react-toastify/dist/ReactToastify.css";
import { toaster } from "@/utils/toaster";
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";

export function LoginForm({ className, ...props }) {
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Email/password login
  const onSubmit = async (data) => {

    const { email, password } = data;
    const result = await loginWithEmail(email, password);
    if (result.error) {
      const res = result.error.code;
      console.log(res);
      if (res === "auth/user-not-found") {
        toaster("User not found", theme);
      }else if (
        res === "auth/wrong-password" ||
        res === "auth/invalid-email" ||
        res === "auth/user-disabled" ||
        res==="auth/invalid-credential"
      ) {
        toaster("Invalid Credential", theme);
      } else if (res === "auth/too-many-requests") {
        toaster("Too many requests, please try again later", theme);
      } else {
        toaster(result.error.message || "Login failed", theme);
      }
       } else {
      // toaster("Login successful!");
      redirect("/");
      // handle success (e.g., redirect or show message)
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    
    const result = await signInWithGoogle();
    if (result.error) {
      toaster("Something went wrong", theme);
       } else {
      // toaster("Google login successful!");
      redirect("/");
      // handle success (e.g., redirect or show message)
    }
  };

  return (
    <>
      <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              // required
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              // required
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            className="border-primary text-primary w-full"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
     
    </>
  );
}
