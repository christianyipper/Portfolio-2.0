"use client";

import Navigation from "./navigation";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-white min-h-screen">
            <div className="md:pr-[25%]">
                {children}
            </div>
            <nav className="md:fixed md:right-0 md:top-0 md:h-screen md:w-[25%]">
                <Navigation />
            </nav>
        </main>
    );
}
