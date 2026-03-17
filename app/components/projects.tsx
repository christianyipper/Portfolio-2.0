"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import motionProjectsData from "../../public/data/motion-projects.json";
import graphicsProjectsData from "../../public/data/graphics-projects.json";

const totalCards = motionProjectsData.length + graphicsProjectsData.length;

interface ProjectEntry {
    title: string;
    year: string;
    subtitle: string;
    logo: string;
    logoAlt: string;
    thumbnail: string;
    thumbnailAlt: string;
    video?: string;
}

const MASK_STYLE: React.CSSProperties = {
    WebkitMaskImage: "url('/img/card-mask.svg')",
    maskImage: "url('/img/card-mask.svg')",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
};

// Border path inset ~2 units from the card boundary so the stroke sits
// fully inside the visible area — no masking or clipping needed (LN technique)
// Exact card boundary path — stroke straddles the edge so the outer half
// covers the mask's anti-aliased soft edge (overflow="visible" on the SVG lets it render outside viewBox)
const BORDER_PATH = "M0 10 C0 4.48 4.48 0 10 0 H390 C395.52 0 400 4.48 400 10 V444 C400 449.52 395.52 454 390 454 H259 C252 454 245 458 241 464 L225 489 C221 496 214 500 207 500 H10 C4.48 500 0 495.52 0 490 V10 Z";

function ProjectCard({ entry, visible }: { entry: ProjectEntry; visible: boolean }) {
    const [animDone, setAnimDone] = useState(false);

    return (
        <div
            className={`${animDone ? "" : visible ? "ink-mask-inview" : "ink-mask-outview"} relative aspect-[4/5] group cursor-pointer`}
            onAnimationEnd={() => { if (visible) setAnimDone(true); }}
        >
            {/* Content — masked to card shape */}
            <div className="absolute inset-0 overflow-hidden" style={MASK_STYLE}>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Logo — top left */}
                {entry.logo && (
                    <div className="absolute top-3 left-3 w-8 h-8">
                        <Image src={entry.logo} alt={entry.logoAlt} fill className="object-contain" />
                    </div>
                )}

                {/* Accent lines tracing the cut edges */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 400 500"
                    preserveAspectRatio="none"
                >
                    <line x1="390" y1="454" x2="259" y2="454" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    <path d="M259 454 C252 454 245 458 241 464 L225 489 C221 496 214 500 207 500" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                </svg>
            </div>

            {/* Text — in the notch cut-out area, bottom-right */}
            <div className="absolute w-full bottom-0 pr-2 text-right pointer-events-none bg-amber-600">
                {/* <p className="font-nunito text-[9px] uppercase tracking-widest opacity-50 mb-0.5 truncate">
                    {entry.subtitle}
                </p> */}
                <span className="block font-aktive text-[12px] tracking-widest opacity-100 truncate">
                    {entry.year}
                </span>
                <h3 className="font-aktiv text-[12px] leading-tight truncate">
                    {entry.title}
                </h3>
            </div>

            {/* Border — inset SVG stroke, no masking needed, no fraying */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 500"
                overflow="visible"
            >
                <path d={BORDER_PATH} fill="none" stroke="rgba(255,255,255,1)" strokeWidth="2" />
                <path
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    d={BORDER_PATH}
                    fill="none"
                    stroke="rgba(249,115,22,1)"
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
}

export default function Projects() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [visibleStates, setVisibleStates] = useState<boolean[]>(new Array(totalCards).fill(false));

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
            {/* Faded bottom overlay */}
            {/* <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black/90 via-black/50 to-black/0 z-30" /> */}

            <section className="col-start-1 col-end-13 overflow-y-scroll h-full pt-16">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-8 p-2 px-[calc(2/12*100%)]">
                    {motionProjectsData.map((entry, i) => (
                        <div key={`motion-${i}`} ref={(el) => { cardRefs.current[i] = el; }} className={i % 3 === 1 ? "sm:translate-y-32" : ""}>
                            <ProjectCard entry={entry as ProjectEntry} visible={visibleStates[i]} />
                        </div>
                    ))}
                    {/* {graphicsProjectsData.map((entry, i) => {
                        const idx = motionProjectsData.length + i;
                        return (
                            <div key={`graphics-${i}`} ref={(el) => { cardRefs.current[idx] = el; }} className={idx % 3 === 1 ? "sm:translate-y-32" : ""}>
                                <ProjectCard entry={entry as ProjectEntry} visible={visibleStates[idx]} />
                            </div>
                        );
                    })} */}
                </div>
            </section>
        </>
    );
}