import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl px-4">
        {/* Pro Plan (Upgrade) Card First */}
        <Card className="flex-1 border border-border bg-card text-card-foreground shadow-lg relative p-4 order-1 md:order-none">
          <div className="absolute right-0 top-0 m-4 px-4 py-1 rounded-md bg-primary text-primary-foreground text-xs font-bold tracking-widest">
            POPULAR
          </div>
          <CardHeader>
            <div className="text-xl font-bold mb-2">Pro Plan</div>
            <CardTitle className="text-4xl font-extrabold mb-4 text-primary">
              $5/month
            </CardTitle>
            <ul className="space-y-2 mb-6">
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
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold py-6 rounded-md"
              asChild
            >
              <a href="/dashboard/pricing/payment">Upgrade Now</a>
            </Button>
          </CardFooter>
        </Card>
        {/* Free Plan */}
        <Card className="flex-1 border border-border bg-card text-card-foreground shadow-lg p-4 order-2 md:order-none">
          <CardHeader>
            <div className="text-xl font-bold mb-2">Free Plan</div>
            <CardTitle className="text-4xl font-extrabold mb-4">
              Free Forever
            </CardTitle>
            <ul className="space-y-2 mb-6">
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
            <Button className="w-full" variant="outline">
              Start for Free
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
