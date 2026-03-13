"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import motionProjectsData from "../../public/data/motion-projects.json";
import graphicsProjectsData from "../../public/data/graphics-projects.json";

const totalCards = motionProjectsData.length + graphicsProjectsData.length;

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
            {/* faded bottom overlay */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black/90 via-black/50 to-black/0 z-30" />

            <section className="col-start-1 col-end-13 overflow-y-scroll h-full pt-16">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2 px-[calc(2/12*100%)]">
                    {motionProjectsData.map((entry, i) => (
                        <div
                            key={`motion-${i}`}
                            ref={(el) => { cardRefs.current[i] = el; }}
                            className={`${visibleStates[i] ? "ink-mask-inview" : "ink-mask-outview"} relative aspect-3/4 rounded-xl overflow-hidden bg-black`}
                        >
                            {entry.video ? (
                                <video
                                    className="absolute inset-0 w-full h-full object-cover"
                                    src={entry.video}
                                    poster={entry.thumbnail}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                            ) : (
                                <Image
                                    className="object-cover"
                                    src={entry.thumbnail}
                                    alt={entry.thumbnailAlt}
                                    fill
                                />
                            )}
                        </div>
                    ))}
                    {graphicsProjectsData.map((entry, i) => {
                        const idx = motionProjectsData.length + i;
                        return (
                            <div
                                key={`graphics-${i}`}
                                ref={(el) => { cardRefs.current[idx] = el; }}
                                className={`${visibleStates[idx] ? "ink-mask-inview" : "ink-mask-outview"} relative aspect-3/4 rounded-xl overflow-hidden bg-black`}
                            >
                                <Image
                                    className="object-cover"
                                    src={entry.thumbnail}
                                    alt={entry.thumbnailAlt}
                                    fill
                                />
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
