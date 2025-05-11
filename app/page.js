import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
    <Image src={'/logo.png'} alt="caption crafter"  width={200} height={200}></Image>

    </div>
  );
}
