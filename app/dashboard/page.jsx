"use client";
import PeopleGeneratedCption from "@/components/people-generated-caption";
import auth from "@/config/firebase";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  BadgeCheck,
  PlusCircle,
  ArrowUpRight,
} from "lucide-react";
// import { useEffect } from "react";

export default function Page() {
  // useEffect(() => {
  //   fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/test").then((res) => {
  //     if (res.status === 200) {
  //       console.log("Backend is up and running");
  //     } else {
  //       console.error("Backend is down");
  //     }
  //   });
    
  // },[])
  // Placeholder stats
  const captionsToday = 3;
  const captionsWeek = 15;
  const remainingCredits = 7;

  return (
    <div className="max-w-4xl w-full mx-auto p-6 md:p-10">
      <Card className="mb-8 p-0 bg-background/80 shadow-none rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-4 px-6 pt-6 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2 text-primary">
              Hey{" "}
              {auth?.currentUser?.displayName ||
                auth?.currentUser?.email?.split("@")[0] ||
                "Guest"}
              <Sparkles className="text-accent w-6 h-6 animate-bounce" />
            </CardTitle>
            <CardDescription>
              Welcome back! Ready to craft some captions?
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="grid cursor-pointer grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="flex flex-col items-center p-6 border-2 border-border rounded-xl hover:border-primary transition-colors">
          <CardHeader className="flex flex-col items-center gap-1 p-0 mb-2">
            <BadgeCheck className="text-primary w-7 h-7 mb-1" />
            <CardDescription>Captions Today</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <span className="text-3xl font-extrabold text-primary">
              {captionsToday}
            </span>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center p-6 border-2 border-border rounded-xl hover:border-primary transition-colors">
          <CardHeader className="flex flex-col items-center gap-1 p-0 mb-2">
            <BadgeCheck className="text-primary w-7 h-7 mb-1" />
            <CardDescription>This Week</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <span className="text-3xl font-extrabold text-primary">
              {captionsWeek}
            </span>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center p-6 border-2 border-border rounded-xl hover:border-primary transition-colors">
          <CardHeader className="flex flex-col items-center gap-1 p-0 mb-2">
            <PlusCircle className="text-accent w-7 h-7 mb-1" />
            <CardDescription>Credits Left</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <span className="text-3xl font-extrabold text-accent">
              {remainingCredits}
            </span>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <Button
          asChild
          className="flex-1 text-lg font-semibold py-3 md:py-6"
          variant="default"
        >
          <Link
            href="/dashboard/generate"
            className="flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" /> Generate Caption{" "}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Button>
        <Button
          asChild
          className="flex-1 text-lg font-semibold py-3 md:py-6"
          variant="secondary"
        >
          <Link
            href="/dashboard/pricing"
            className="flex items-center justify-center gap-2"
          >
            <BadgeCheck className="w-5 h-5" /> Upgrade Plan{" "}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <PeopleGeneratedCption />
    </div>
  );
}
