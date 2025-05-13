"use client";
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
  Info,
  Loader,
} from "lucide-react";
import RecentGeneratedCption from "@/components/recent-generated-captions";
import { getStats } from "@/utils/_get-stats";
import React from "react";
import { getUserPlan } from "@/utils/_get-plan";

export default function Page() {
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    remaingCredits: 0,
    usedCredits: 0,
    plan: "Free",
    dailyLimit: 5,
  });
  React.useEffect(() => {
    getStats()
      .then((data) => {
        console.log("Stats data:", data);
        setStats(data.response);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
        getUserPlan(auth.currentUser.uid)
          .then((plan) => {
            if (plan.toLowerCase() === "free") {
              setStats({
                remaingCredits: 0,
                usedCredits: 0,
                plan: "Free",
                dailyLimit: 5,
              });
            } else {
              setStats({
                remaingCredits: "Unlimited",
                usedCredits: 0,
                plan: "Premium",
                dailyLimit: "Unlimited",
              });
            }
          })
          .catch((error) => {
            console.error("Error fetching user plan:", error);
          });
      }).finally(() => {
        setLoading(false);
      }); 
  }, []);

  console.log(stats)

  return (
    <div className="max-w-4xl w-full mx-auto p-6 md:p-10">
      <div className="flex items-center gap-2 mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-300" />
        <span className="font-medium">Pro Tip:</span>
        <span>Save Caption to edit and further change, it's recommended.</span>
      </div>
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
          <CardHeader className="flex flex-col items-center w-full gap-1 p-0 mb-2">
            <BadgeCheck className="text-primary w-7 h-7 mb-1" />
            <CardDescription>Total Used Credits</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <span className="text-3xl font-extrabold text-primary">
              {loading ? (
                <>
                  <Loader className="animate-spin size-7" />
                </>
              ) : (
                stats.usedCredits
              )}
            </span>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center p-6 border-2 border-border rounded-xl hover:border-primary transition-colors">
          <CardHeader className="flex flex-col items-center w-full  gap-1 p-0 mb-2">
            <BadgeCheck className="text-primary w-7 h-7 mb-1" />
            <CardDescription>Daily Limit</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <span className="text-3xl font-extrabold text-primary">
              {loading ? (
                <>
                  <Loader className="animate-spin size-7" />
                </>
              ) : (
                stats.dailyLimit
              )}
            </span>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center p-6 border-2 border-border rounded-xl hover:border-primary transition-colors">
          <CardHeader className="flex flex-col items-center w-full  gap-1 p-0 mb-2">
            <PlusCircle className="text-accent w-7 h-7 mb-1" />
            <CardDescription>Credits Left</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <span className="text-3xl font-extrabold text-accent">
              {loading ? (
                <>
                  <Loader className="animate-spin size-7" />
                </>
              ) : (
                stats.remaingCredits
              )}
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

      <RecentGeneratedCption limit={35} />
    </div>
  );
}
