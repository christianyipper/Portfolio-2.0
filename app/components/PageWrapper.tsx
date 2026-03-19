"use client";

import { useEffect, useState } from "react";
import { useTransition } from "../context/TransitionContext";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const { isExiting } = useTransition();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <div
            className="pl-8 transition-opacity duration-500 ease-in-out"
            style={{ opacity: isExiting ? 0 : mounted ? 1 : 0 }}
        >
            {children}
        </div>
    );
}
