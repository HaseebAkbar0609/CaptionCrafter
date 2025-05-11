import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen p-3 gap-3 ">
      {/* Sidebar skeleton */}
      <Skeleton className="w-64  min-w-[16rem] rounded-2xl  bg-muted/50 flex flex-col" />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar skeleton */}
        <Skeleton className="h-20 bg-muted/50 w-full rounded-2xl mb-2" />
        <Skeleton className="h-full bg-muted/50 w-full rounded-2xl " />
        {/* Body skeleton */}

        {/* <Skeleton className="bg-muted/50 aspect-video rounded-xl w-full h-32 md:h-auto" /> */}
      </div>
    </div>
  );
}
