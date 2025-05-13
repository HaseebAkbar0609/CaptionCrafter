
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col text-primary gap-2 h-screen w-screen items-center justify-center ">
      <Loader className="animate-spin size-12 md:size-14" />
      <h1 className="md:text-2xl text-xl font-semibold">Caption Crafter.</h1>
    </div>
  );
}
