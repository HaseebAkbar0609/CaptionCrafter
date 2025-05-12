import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Error404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="relative mb-8">
        <Sparkles className="w-24 h-24 text-accent animate-bounce drop-shadow-lg" />
        <span
          className="absolute inset-0 animate-ping rounded-full bg-accent/20"
          style={{ zIndex: 0 }}
        ></span>
      </div>
      <h1 className="text-6xl font-extrabold text-primary mb-2">404</h1>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Page Not Found
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
        <br />
        Let's get you back to your dashboard.
      </p>
      <Button asChild className="text-lg font-semibold px-8 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          Go to Dashboard 
        </Link>
      </Button>
    </div>
  );
}
