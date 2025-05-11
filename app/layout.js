
import "./globals.css";



export const metadata = {
  title: "Caption Crafter",
  description: "AI powered caption generator for Instagram, TikTok, LinkedIn and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
