"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { toaster } from "@/utils/toaster";
import { resetPasswordWithEmail } from "@/utils/firebase_auth";

export function ForgotPasswordForm({ className, ...props }) {
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { email } = data;
    const result = await resetPasswordWithEmail(email);
    if (result?.error) {
      const res = result.error.code;
      if (res === "auth/user-not-found") {
        toaster("No account found with this email", theme);
      } else if (res === "auth/invalid-email") {
        toaster("Invalid email address", theme);
      } else {
        toaster(result.error.message || "Reset failed", theme);
      }
    } else {
      toaster("Password reset email sent!", theme);
      // Reset the form fields after successful submission
      document.querySelector("form").reset();
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot Password?</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to receive a password reset link.
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Remembered your password?{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  );
}
