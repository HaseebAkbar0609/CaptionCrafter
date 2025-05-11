// "use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// import * as React from "react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

export default function Home() {
  // const { theme, setTheme } = useTheme();

  // const changeTheme = () => {
  //   console.log("current theme", theme);
  //   if (theme === "dark") {
  //     setTheme("light");
  //   } else if (theme === "light") {
  //     setTheme("dark");   
  //   } else {
  //     setTheme("dark"); // Default to dark if theme is undefined or system
  //   }
  //   console.log("theme changed");
  // };

  return (
    <>
      {/* <div onClick={changeTheme}>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div> */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Image
          src={"/logo.png"}
          alt="caption crafter"
          width={200}
          height={200}
        />
        <Button>Let get's Start</Button>
      </div>
    </>
  );
}