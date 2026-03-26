"use client";

import Navigation from "./navigation";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-white grid grid-cols-12 gap-8 min-h-screen">
            <div className="col-span-12 md:col-span-9">
                {children}
            </div>
            <nav className="col-span-12 md:col-span-3 md:sticky md:top-0 md:h-screen">
                <Navigation />
            </nav>
        </main>
    );
}
