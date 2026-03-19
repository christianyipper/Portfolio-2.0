"use client";

import { useTransition } from "../context/TransitionContext";

export default function BackButton() {
    const { navigate } = useTransition();

    return (
        <button
            onClick={() => navigate("/#projects")}
            className="inline-flex items-center gap-2 font-aktiv text-sm text-black/50 hover:text-black transition-colors duration-200 cursor-pointer"
        >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
        </button>
    );
}
