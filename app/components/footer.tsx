"use client";

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import paperPlaneAnimation from "../../public/svg/Paper plane.json";
import Copyright from "./copyright.jsx";

export default function Footer() {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(false);
    const targetPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const animate = () => {
            currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.1;
            currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.1;
            setCursorPos({ x: currentPos.current.x, y: currentPos.current.y });
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, []);

    return (
        <section className="relative w-full h-64 p-8">
            {/* Paper plane cursor */}
            <div
                className="fixed pointer-events-none z-9999 w-8 h-8 transition-opacity duration-200"
                style={{
                    left: cursorPos.x,
                    top: cursorPos.y,
                    transform: "translate(4px, -100%)",
                    opacity: cursorVisible ? 1 : 0,
                }}
            >
                <div className="w-full h-full rounded-full overflow-hidden bg-[#00BBFF]">
                    <div className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4">
                        <Lottie animationData={paperPlaneAnimation} loop />
                    </div>
                </div>
            </div>

            <h3 className="font-zuume font-bold text-[64px] w-full text-center">Let&apos;s Work Together!</h3>
            <a
                href="mailto:christian@yipper.ca"
                className="group relative flex items-center justify-center mx-auto w-fit px-10 py-3 rounded-2xl border-2 border-transparent hover:border-[#00bbff] hover:bg-[#00bbff] hover:text-white text-[#00BBFF] transition-all ease duration-200 cursor-pointer"
                onMouseMove={(e) => { targetPos.current = { x: e.clientX, y: e.clientY }; }}
                onMouseEnter={() => setCursorVisible(true)}
                onMouseLeave={() => setCursorVisible(false)}
            >
                <svg width="100%" height="100%" className="absolute inset-0 overflow-visible pointer-events-none">
                    <rect x="0" y="0" width="100%" height="100%" rx="16" ry="16" fill="none" stroke="#00BBFF" strokeWidth="2.5" strokeDasharray="10 8" style={{ animation: 'marching-ants 2s linear infinite' }} />
                </svg>
                <span className="font-zuume font-bold text-[32px] tracking-wide inline-block transition-transform duration-200 ease group-hover:scale-110">christian@yipper.ca</span>
            </a>
            <div>
                <Copyright />
            </div>
        </section>
    );
}
