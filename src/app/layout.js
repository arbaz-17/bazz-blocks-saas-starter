// app/layout.js
import "./globals.css";
import "../styles/logo-marquee.css"
import Image from "next/image";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { NavbarBase } from "@/components/navigation/NavbarBase";
import { navItems, cta } from "@/config/navbar";
import { FooterBase } from "@/components/navigation/FooterBase";
import { footerSectionConfig } from "@/config/footer";
import { Inter, Space_Grotesk, Poppins } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // multiple weights
  variable: "--font-sans",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});


export const metadata = {
  title: "Arbaz UI Kit – SaaS UI Library",
  description:
    "Config-driven SaaS UI components for Next.js built with Tailwind, shadcn/ui, and Framer Motion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"
    suppressHydrationWarning 
    className={`${spaceGrotesk.variable} ${inter.variable} ${poppins.variable} antialiased`}>
      <body>
        <ThemeProvider>
          <NavbarBase
            logo={
              <div className="flex items-center gap-2">
                <Image
                  src="/logo/logo.svg"
                  alt="Bazz Blocks"
                  width={28}
                  height={28}
                  className="h-7 w-auto"
                  priority
                />
                {/* Optional text next to logo */}
                {/*<span className="text-base font-bold">Bazz Blocks</span>*/}
              </div>
            }
            navItems={navItems}
            cta={cta}
            sticky
          />
          {children}
          <FooterBase {...footerSectionConfig} />
        </ThemeProvider>
      </body>
    </html>
  );
}
