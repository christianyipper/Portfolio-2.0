import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const aktiv = localFont ({
    src: "../public/fonts/AktivGroteskEx_XBd.ttf",
    variable: "--font-aktiv",
})

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"],
    weight: ["600"],
});

export const metadata: Metadata = {
    title: "Yipper Creative",
    description: "Explore Yipper Creative — putting sports and design-forward brands in motion.",
    keywords: [
        "Christian Yip",
        "Yipper",
        "Yipper Creative",
        "creative",
        "creative designer",
        "visual design",
        "graphic design",
        "portfolio",
        "design portfolio",
        "web design",
        "web developer",
        "front-end developer",
        "branding",
        "brand-centric",
        "sports branding",
        "motion graphics",
        "motion design",
        "freelance designer",
        "sports graphics",
    ],
    openGraph: {
        title: "Yipper Creative",
        description:
            "Explore Yipper Creative — putting sports and design-forward brands in motion.",
        url: "https://yipper.ca",
        siteName: "Yipper Creative",
        locale: "en_US",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${aktiv.variable} antialiased`}
        >
            {children}
        </body>
        </html>
    );
}
