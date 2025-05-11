import { Captions } from "lucide-react";

export default function AuthPageLayout({children}) {
  return (
    <div className=" min-h-svh  flex flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center gap-2 md:justify-start">
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className=" text-primary-foreground bg-primary flex size-6 items-center justify-center rounded-md">
            {/* <GalleryVerticalEnd /> */}
            <Captions className="size-4" />
            {/* <Image src="/short-logo.png" width="80" height="80"></Image> */}
          </div>
          Caption Crafter.
        </a>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
         {children}
        </div>
      </div>
    </div>
  );
}