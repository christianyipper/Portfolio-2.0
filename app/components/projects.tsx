"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import { useTransition } from "../context/TransitionContext";
import eyeAnimation from "../../public/svg/Eye.json";
import motionProjectsData from "../data/motion-projects";
import type { Project as ProjectEntry } from "../data/types";

const totalCards = motionProjectsData.length;

// Notch shape path (400×500 coordinate space)
const NOTCH_PATH = "M0 16 C0 7.16 7.16 0 16 0 H384 C392.84 0 400 7.16 400 16 V438 C400 446.84 392.84 454 384 454 H259 C252 454 245 458 241 464 L225 489 C221 496 214 500 207 500 H16 C7.16 500 0 492.84 0 484 V16 Z";
// Rectangle path — same command structure, notch points collapsed to bottom-right corner
const RECT_PATH  = "M0 16 C0 7.16 7.16 0 16 0 H384 C392.84 0 400 7.16 400 16 V484 C400 492.84 392.84 500 384 500 H384 C384 500 384 500 384 500 L384 500 C384 500 384 500 384 500 H16 C7.16 500 0 492.84 0 484 V16 Z";


function ProjectCard({ entry, visible, index }: { entry: ProjectEntry; visible: boolean; index: number }) {
    const [hovered, setHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const clipId = `card-clip-${index}`;

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 639px)");
        if (mq.matches) {
            setIsMobile(true);
            setHovered(true);
        }
    }, []);

    const active = isMobile || hovered;

    return (
        <div
            className="relative aspect-4/5 group cursor-pointer"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(64px)",
                transition: "opacity 1s ease, transform 1s ease",
            }}
            onMouseEnter={() => { if (!isMobile) setHovered(true); }}
            onMouseLeave={() => { if (!isMobile) setHovered(false); }}
        >
            {/* Per-card clipPath — morphs between rect and notch on hover */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <clipPath id={clipId} clipPathUnits="objectBoundingBox" transform="scale(0.0025 0.002)">
                        <path d={active ? NOTCH_PATH : RECT_PATH} style={{ transition: 'd 0.2s ease-in-out' }} />
                    </clipPath>
                </defs>
            </svg>

            {/* Content — clipped to card shape */}
            <div className="absolute inset-0" style={{ clipPath: `url(#${clipId})` }}>
                {/* Media */}
                {entry.video ? (
                    <video
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        src={entry.video}
                        poster={entry.thumbnail}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    <Image
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        src={entry.thumbnail}
                        alt={entry.thumbnailAlt}
                        fill
                    />
                )}

                {/* Gradient overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" /> */}

                {/* Logo — top left */}
                {entry.logo && (
                    <div className="absolute top-3 left-3 w-8 h-8">
                        <Image src={entry.logo} alt={entry.logoAlt ?? ""} fill className="object-contain" />
                    </div>
                )}

                {/* Accent lines tracing the cut edges */}
                {/* <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 400 500"
                    preserveAspectRatio="none"
                >
                    <line x1="390" y1="454" x2="259" y2="454" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    <path d="M259 454 C252 454 245 458 241 464 L225 489 C221 496 214 500 207 500" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                </svg> */}
            </div>

            {/* Text — in the notch cut-out area, bottom-right, revealed on hover */}
            <div className="absolute flex flex-col justify-end w-full bottom-0 pr-2 text-right pointer-events-none transition-opacity duration-200" style={{ opacity: active ? 1 : 0 }}>
                {/* <p className="font-nunito text-[9px] uppercase tracking-widest opacity-50 mb-0.5 truncate">
                    {entry.subtitle}
                </p> */}
                {/* <span className="block font-zuume font-bold uppercase rounded-2xl tracking-widest opacity-100">
                    Learn More
                </span> */}
                <div>
                    <span className="block font-aktive text-[12px] font-bold text-[#00bbff] -mb-1 tracking-widest opacity-100 truncate">
                        {entry.year}
                    </span>
                    <h3 className="font-aktiv text-[16px] leading-tight truncate">
                        {entry.title}
                    </h3>
                </div>
            </div>

            {/* Border — morphs with clip shape */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 500"
                overflow="visible"
            >
                <path d={active ? NOTCH_PATH : RECT_PATH} fill="none" stroke="rgba(255,255,255,1)" strokeWidth="4" style={{ transition: 'd 0.2s ease-in-out, opacity 0.2s ease-in-out', opacity: active ? 0 : 1 }} />
                <path
                    d={active ? NOTCH_PATH : RECT_PATH}
                    fill="none"
                    stroke="rgba(0,187,255,1)"
                    strokeWidth="4"
                    style={{ transition: 'd 0.2s ease-in-out, opacity 0.2s ease-in-out', opacity: active ? 1 : 0 }}
                />
            </svg>
        </div>
    );
}

export default function Projects() {
    const { navigate } = useTransition();
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [visibleStates, setVisibleStates] = useState<boolean[]>(new Array(totalCards).fill(false));
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(false);
    const targetPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const animate = () => {
            const dx = targetPos.current.x - currentPos.current.x;
            const dy = targetPos.current.y - currentPos.current.y;
            currentPos.current.x += dx * 0.1;
            currentPos.current.y += dy * 0.1;
            setCursorPos({ x: currentPos.current.x, y: currentPos.current.y });
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, []);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        cardRefs.current.forEach((el, index) => {
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    setVisibleStates((prev) => {
                        const updated = [...prev];
                        updated[index] = entry.isIntersecting;
                        return updated;
                    });
                },
                { threshold: 0.2 }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <>
            {/* Lottie cursor — fixed, follows mouse over cards */}
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
                    <Lottie animationData={eyeAnimation} loop style={{ filter: "brightness(0) invert(1)" }} />
                </div>
            </div>

            <section className="h-full bg-white p-8 rounded-4xl shadow-2xl">
                <h2 className="font-zuume text-[64px] font-bold pb-4">My Projects</h2>
                <div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-8"
                    onMouseMove={(e) => { targetPos.current = { x: e.clientX, y: e.clientY }; }}
                >
                    {motionProjectsData.map((entry, i) => (
                        <Link
                            key={`motion-${i}`}
                            href={`/projects/${entry.title.toLowerCase().replace(/\s+/g, "-")}`}
                            ref={(el) => { cardRefs.current[i] = el as HTMLDivElement | null; }}
                            className={`block ${i % 3 === 1 ? "sm:-translate-y-22" : ""} ${cursorVisible ? "cursor-none" : ""}`}
                            onMouseEnter={() => setCursorVisible(true)}
                            onMouseLeave={() => setCursorVisible(false)}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/projects/${entry.title.toLowerCase().replace(/\s+/g, "-")}`);
                            }}
                        >
                            <ProjectCard entry={entry as ProjectEntry} visible={visibleStates[i]} index={i} />
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}