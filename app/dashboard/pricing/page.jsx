import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  // Simulate user plan status (replace with real logic)
  const userPlan = "free"; // or "pro"

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-background text-foreground">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl px-4">
        {/* Pro Plan (Upgrade) Card First */}
        <Card
          className={`flex-1 border border-border rounded-2xl  bg-card text-card-foreground shadow-lg relative p-4 order-1 py-10 md:order-none ${
            userPlan === "pro" ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          <div className="absolute right-0 top-0 m-4 px-3 py-0.5 rounded-md bg-primary text-primary-foreground text-[10px] font-bold tracking-widest">
            POPULAR
          </div>
          <CardHeader>
            <div className="text-base font-semibold mb-1">Pro Plan</div>
            <CardTitle className="text-2xl font-bold mb-2 text-primary">
              $5/month
            </CardTitle>
            <ul className="space-y-1 mb-4 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary">✔</span>Unlimited captions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✔</span>All tones & features
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✔</span>Advanced hashtags & CTAs
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✔</span>Priority support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✔</span>Save favorite captions
              </li>
            </ul>
          </CardHeader>
          <CardFooter>
            {userPlan === "pro" ? (
              <Button className="w-full bg-primary text-primary-foreground text-base font-semibold py-4 rounded-md">
                Current Plan
              </Button>
            ) : (
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold py-4 rounded-md"
                asChild
              >
                <Link href="/dashboard/pricing/payment">Upgrade Now</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
        {/* Free Plan */}
        <Card
          className={`flex-1 border rounded-2xl border-border bg-card text-card-foreground shadow-lg p-4 py-10 order-2 md:order-none ${
            userPlan === "free"
              ? "ring-2 ring-primary"
              : "opacity-60 pointer-events-none"
          }`}
        >
          <CardHeader>
            <div className="text-base font-semibold mb-1">Free Plan</div>
            <CardTitle className="text-2xl font-bold mb-2">
              Free Forever
            </CardTitle>
            <ul className="space-y-1 mb-4 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary">✔</span>5 Captions per day
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✔</span>1 Tone option
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✔</span>Basic hashtag suggestions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✔</span>Standard support
              </li>
            </ul>
          </CardHeader>
          <CardFooter>
            {userPlan === "free" ? (
              <Button
                className="w-full text-base py-4"
                variant="outline"
                disabled
              >
                Current Plan
              </Button>
            ) : (
              <Button className="w-full text-base py-4" variant="outline">
                Start for Free
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
