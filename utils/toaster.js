// "use client"
// import { useTheme } from "next-themes";
import { toast } from "react-toastify";

// theme: 'light' | 'dark'
// const theme=useTheme();
export const toaster = (s,theme='dark') => {
  toast(s,{
    theme: theme==="light"?'light':'dark',

  });
};