"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { toaster } from "@/utils/toaster";
import { resetPasswordWithCode } from "@/utils/firebase_auth";
import { useSearchParams, redirect } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export function ResetPasswordForm({ className, ...props }) {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode");
  useEffect(() => {
    if (mode !== "resetPassword") {
      toaster("Invalid or expired reset link", theme);
      redirect("/auth/login");
    }
  }, [mode, theme]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toaster("Passwords do not match", theme);
      return;
    }
    if (!oobCode) {
      toaster("Invalid or expired reset link", theme);
      return;
    }
    const result = await resetPasswordWithCode(oobCode, password);
    if (result?.error) {
      const res = result.error.code;
      if (res === "auth/expired-action-code") {
        toaster("Reset link expired", theme);
      } else if (res === "auth/weak-password") {
        toaster("Password should be at least 6 characters", theme);
      } else {
        toaster(result.error.message || "Reset failed", theme);
      }
    } else {
      toaster("Password reset successful!", theme);
      redirect("/auth/login");
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password below.
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
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
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset Password"}
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
