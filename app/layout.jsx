
import "./globals.css";
import { Poppins } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});


export const metadata = {
  title: "Caption Crafter",
  description: "AI powered caption generator for Instagram, TikTok, LinkedIn and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 9999 }}
      />
        </ThemeProvider>
      </body>
    </html>
  );
}
