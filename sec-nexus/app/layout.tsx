import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Import Poppins
import UserSyncHandler from '@/components/UserSyncHandler';


export const metadata: Metadata = {
  title: "SEC NEXUS",
  description: "Fixed draft of SEC NEXUS",
  icons: {
    icon: "/assets/images/logo.svg",
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SEC NEXUS",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"], // Specify desired weights
  variable: "--font-poppins", // Define a CSS variable for the font
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
      
        <html lang="en" className={`${poppins.variable}`}>
          <body>

            {children}
            <UserSyncHandler />
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}