import ThemeChangeBtn from "@/components/ThemeChangeBtn";
import { Captions } from "lucide-react";
import Link from "next/link";

export default function AuthPageLayout({children}) {
  return (
    <div className=" min-h-svh  flex flex-col gap-4 p-6 md:p-8">
      <div className="flex justify-center gap-2 md:justify-start">
        <Link href="/" className="flex items-center gap-2 font-medium text-lg ">
          <div className=" text-primary-foreground bg-primary  flex size-7 items-center justify-center rounded-md">
            {/* <GalleryVerticalEnd /> */}
            <Captions className="size-5" />
            {/* <Image src="/short-logo.png" width="80" height="80"></Image> */}
          </div>
          Caption Crafter.
        </Link>
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <ThemeChangeBtn />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">{children}</div>
      </div>
    </div>
  );
}