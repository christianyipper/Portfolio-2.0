"use client";

import { useTransition } from "../context/TransitionContext";

export default function BackButton({ to = "/#projects" }: { to?: string }) {
    const { navigate } = useTransition();

    return (
        <button
            onClick={() => navigate(to)}
            className="inline-flex items-center gap-1 font-zuume font-bold text-2xl text-black bg-white shadow-sm hover:text-white hover:bg-[#00bbff] transition-colors duration-200 cursor-pointer pl-2 pr-4 py-2 rounded-xl"
        >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
        </button>
    );
}
