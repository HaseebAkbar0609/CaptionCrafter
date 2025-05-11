"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import auth from "@/config/firebase";

export default function AccountPage() {
  const profileForm = useForm({
    defaultValues: {
      name: auth.currentUser?.displayName || "",
      email: auth.currentUser?.email || "",
    },
  });

  const passwordForm = useForm();

  const onProfileSubmit = async (data) => {
    // TODO: Implement profile update logic
    alert("Profile updated!\n" + JSON.stringify(data, null, 2));
  };

  const onPasswordSubmit = async (data) => {
    // TODO: Implement password update logic
    alert("Password updated!\n" + JSON.stringify(data, null, 2));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background py-10 px-2">
      <Card className={"w-full max-w-md p-6 "}>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>
            Update your profile information below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            className="space-y-5"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                {...profileForm.register("name", {
                  required: "Name is required",
                })}
                className="mt-1"
              />
              {profileForm.formState.errors.name && (
                <span className="text-red-500 text-xs mt-1 block">
                  {profileForm.formState.errors.name.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                disabled
                {...profileForm.register("email")}
                className="mt-1"
              />
              <span className="text-xs text-muted-foreground mt-1 block">
                Email cannot be changed.
              </span>
            </div>
            <CardFooter className="p-0 mt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={profileForm.formState.isSubmitting}
              >
                {profileForm.formState.isSubmitting
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
        </Card>
        <div className="w-[90%] h-px bg-border my-2" />
      <Card className={"w-full max-w-md p-6 mt-4"}>
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
          <CardDescription>Change your account password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="space-y-5"
          >
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="New password"
                {...passwordForm.register("newPassword", {
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="mt-1"
              />
              {passwordForm.formState.errors.newPassword && (
                <span className="text-red-500 text-xs mt-1 block">
                  {passwordForm.formState.errors.newPassword.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="confirm-new-password">Confirm New Password</Label>
              <Input
                id="confirm-new-password"
                type="password"
                placeholder="Confirm new password"
                {...passwordForm.register("confirmNewPassword", {
                  validate: (value) =>
                    !value ||
                    value === passwordForm.watch("newPassword") ||
                    "Passwords do not match",
                })}
                className="mt-1"
              />
              {passwordForm.formState.errors.confirmNewPassword && (
                <span className="text-red-500 text-xs mt-1 block">
                  {passwordForm.formState.errors.confirmNewPassword.message}
                </span>
              )}
            </div>
            <CardFooter className="p-0 mt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={passwordForm.formState.isSubmitting}
              >
                {passwordForm.formState.isSubmitting
                  ? "Saving..."
                  : "Update Password"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
