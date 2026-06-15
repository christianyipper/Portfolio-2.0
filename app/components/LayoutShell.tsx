"use client";

import Navigation from "./navigation";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-white min-h-screen">
            <div className="md:pr-[25%]">
                {children}
            </div>
            <nav className="hidden md:block fixed right-0 top-0 h-screen w-[25%]">
                <Navigation />
            </nav>
        </main>
    );
}
