"use client"

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import paperPlaneAnimation from "../../public/svg/Paper plane.json";
import bioData from "../../public/data/about.json";
import Image from "next/image";
import copyright from "../components/copyright.jsx"

import AfterEffects from "../svg/aftereffects";
import Figma from "../svg/figma";
import Illustrator from "../svg/illustrator";
import Next from "../svg/next";
import Photoshop from "../svg/photoshop";
import Premiere from "../svg/premiere";
import React from "../svg/react";
import Tailwind from "../svg/tailwind";
import Webflow from "../svg/webflow";
import Copyright from "../components/copyright.jsx";

export default function About() {
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
        <div className="relative flex flex-col gap-4">
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
            <section className="flex justify-center items-start h-full bg-white p-8 rounded-4xl shadow-2xl
            ">
                <div className="relative w-full overflow-hidden
                max-sm:p-2 max-sm:pl-4
                ">
                    <div className="max-sm:border-b-2 border-black/20 max-sm:pb-8 max-sm:mb-8
                    relative flex flex-row justify-start items-center gap-4 w-0 h-0 pointer-events-none opacity-0
                    max-sm:opacity-100 max-sm:w-fit max-sm:h-auto
                    ">
                        <Image 
                            className="rounded-full"
                            src="/img/yipper-pfp-a75.png"
                            alt="Yipper profile"
                            width={64}
                            height={64}
                            priority
                        />
                        <article>
                            <p className="font-nunito">Christian Yip</p>
                            <p className="font-aktiv">Creative Designer</p>
                        </article>
                    </div>
                    <h2 className="font-zuume font-bold text-[64px] pb-4">About Me</h2>
                    <article className="space-y-4 text-base text-black font-nunito pb-8">
                        {bioData.bio.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </article>
                    <div className="flex flex-row justify-between">
                        <div className="border-t-2 border-black/20 pt-8
                        relative w-fit flex flex-row justify-center items-center gap-4
                        max-sm:hidden
                        ">
                            <Image 
                                className="rounded-full"
                                src="/img/yipper-pfp.png"
                                alt="Yipper profile"
                                width={64}
                                height={64}
                                priority
                            />
                            <article>
                                <p className="font-nunito">Christian Yip</p>
                                <p className="font-aktiv">Creative Designer</p>
                            </article>
                        </div>
                        <div className="flex flex-row justify-center items-center pt-8 gap-9 h-full
                        max-sm:flex-col max-sm:w-full max-sm:pt-0 max-sm:pb-16
                        ">
                            <div className="">
                                <div className="flex flex-row gap-2">.
                                    <AfterEffects/>
                                    <Premiere/>
                                    <Illustrator/>
                                    <Photoshop/>
                                    <Figma/>
                                </div>
                                <p className="font-nunito !text-[14px] opacity-50 w-full text-center mt-2.5 pt-1 border-t-2 border-black/20">Creative Proficiencies</p>
                            </div>
                            <div>
                                <div className="flex flex-row gap-2">
                                    <React/>
                                    <Next/>
                                    <Tailwind/>
                                    <Webflow/>
                                </div>
                                <p className="font-nunito !text-[14px] opacity-50 w-full text-center mt-2.5 pt-1 border-t-2 border-black/20">Front-End Proficiencies</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full h-64 p-8">
                <h3 className="font-zuume font-bold text-[64px] w-full text-center">Let's Work Together!</h3>
                <a href="mailto:christian@yipper.ca"
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
                    <Copyright/>
                </div>
            </section>
        </div>
    );
}