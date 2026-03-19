"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type TransitionContextType = {
    navigate: (href: string) => void;
    isExiting: boolean;
};

const TransitionContext = createContext<TransitionContextType>({
    navigate: () => {},
    isExiting: false,
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
    const [isExiting, setIsExiting] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Reset when navigation completes
    useEffect(() => {
        setIsExiting(false);
    }, [pathname]);

    const navigate = useCallback(
        (href: string) => {
            setIsExiting(true);
            setTimeout(() => {
                router.push(href);
            }, 500);
        },
        [router]
    );

    return (
        <TransitionContext.Provider value={{ navigate, isExiting }}>
            {children}
        </TransitionContext.Provider>
    );
}

export function useTransition() {
    return useContext(TransitionContext);
}
