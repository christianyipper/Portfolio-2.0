"use client";

import Navigation from "./navigation";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-white grid grid-cols-12 gap-8 min-h-screen">
            <div className="col-span-9">
                {children}
            </div>
            <nav className="col-span-3 sticky top-0 h-screen">
                <Navigation />
            </nav>
        </main>
    );
}
