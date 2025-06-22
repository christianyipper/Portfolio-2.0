"use client";

import { useEffect, useRef, useState } from "react";

import projectsData from "../../public/data/projects.json";
import Image from "next/image";

// items used as reference point to trigger intersection observer
const items = [
    { id: 1, name: "BCHL Officials" },
    { id: 2, name: "BCHL" },
    { id: 3, name: "IIHF" },
    { id: 4, name: "Stripes Nation" },
];

export default function Projects() {
    const refs = useRef<(HTMLDivElement | null)[]>([]);
    const [visibleStates, setVisibleStates] = useState<boolean[]>(
        new Array(items.length).fill(false)
    );

    useEffect(() => {

    // Only run observer if not on mobile
    if (typeof window !== "undefined" && window.innerWidth < 640) {
        return;
    }
    
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((el, index) => {
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
            setVisibleStates((prev) => {
                const updated = [...prev];
                updated[index] = entry.isIntersecting;
                return updated;
            });
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        observers.push(observer);
        });

        return () => {
        observers.forEach((observer) => observer.disconnect());
        };
    }, []);
    
    return (
        <section className="col-start-1 col-end-13 flex flex-col justify-start items-start 
        pt-28 h-full gap-12 overflow-y-scroll
        max-sm:pt-40
        ">
            {projectsData.map((entry, i) => (
                <section key={i} className="grid grid-cols-12 gap-4 -mt-4
                max-sm:flex max-sm:flex-col max-sm:w-full
                ">
                    <article className="col-start-3 col-end-8 p-8
                    max-sm:w-full max-sm:p-2 max-sm:pl-4
                    ">
                        <div className="relative flex flex-row justify-between items-center mb-4">
                            <div>
                                <h2 className="font-aktiv !text-4xl">{entry.title}</h2>
                                <p className="font-nunito !text-md opacity-60">{entry.subtitle}</p>
                            </div>
                            <div className="w-20 h-16">
                                <Image 
                                    className="object-contain w-full h-full"
                                    src={entry.logo}
                                    alt="Yipper profile"
                                    width={640}
                                    height={640}
                                    priority
                                />
                            </div>
                        </div>
                        <p className="font-nunito">{entry.description}</p>
                    </article>
                    <div ref={(el) => (refs.current[i] = el)}
                    className={`${visibleStates[i] ? "ink-mask-inview" : "ink-mask-outview"}
                    relative col-start-8 col-end-11 flex flex-col justify-start items-start m-8
                    rounded-2xl overflow-hidden
                    max-sm:m-2 max-sm:ml-4 max-sm:mb-7
                    `}>
                        <Image 
                            className="object-contain w-full h-auto"
                            src={entry.thumbnail}
                            alt="Yipper profile"
                            width={640}
                            height={640}
                            priority
                        />
                        <video className="absolute"
                        src={entry.video} 
                        autoPlay
                        muted
                        loop
                        playsInline/>
                    </div>
                    <hr className="col-start-3 col-end-11 h-0.5 bg-linear-to-r from-white/0 via-white/100 to-white/0 opacity-50 border-none" />
                </section>
            ))}
        </section>
    );
}