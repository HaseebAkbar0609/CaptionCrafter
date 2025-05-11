
import "./globals.css";
import { Poppins } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { Slide, ToastContainer, Zoom } from "react-toastify";


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
    <html >
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
            autoClose={10000}
            hideProgressBar
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme={'dark'}
            transition={Slide}
            // className={'my-toast'}
            
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
