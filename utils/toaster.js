// "use client"
// import { useTheme } from "next-themes";
// import { toast } from "react-toastify";

import { toast } from "sonner";

// theme: 'light' | 'dark'
// const theme=useTheme();
export const toaster = (s,theme='dark') => {
  toast(s);
};