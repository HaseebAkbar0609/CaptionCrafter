
import ThemeChangeBtn from "@/components/ThemeChangeBtn";
import Image from "next/image";

import Link from "next/link";

export default function Home() {
 

  return (
    <>
      <ThemeChangeBtn/>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Image
          src={""}
          alt="caption crafter"
          width={200}
          height={200}
        />
        <Link href={"/auth/login"}>Let get's Start</Link>
      </div>
    </>
  );
}