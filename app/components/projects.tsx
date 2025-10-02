"use client";

import { useEffect, useRef, useState } from "react";

import motionProjectsData from "../../public/data/motion-projects.json";
import graphicsProjectsData from "../../public/data/graphics-projects.json";
import Image from "next/image";

import AfterEffects from "../svg/aftereffects";
import Figma from "../svg/figma";
import Illustrator from "../svg/illustrator";
import Photoshop from "../svg/photoshop";

// Your component map
const componentMap: Record<string, React.FC<unknown>> = {
    AfterEffects,
    Figma,
    Illustrator,
    Photoshop,
};

// items used as reference point to trigger intersection observer
const items = [
    { id: 1, name: "BCHL Officials" },
    { id: 2, name: "BCHL" },
    { id: 3, name: "IIHF" },
    { id: 4, name: "Stripes Nation" },
];

export default function Projects() {
    // Created a filter for component entries (resolves issue with intersection observer not watching intended reference)
    const motionData = motionProjectsData.filter((entry) => componentMap[entry.icon1]);
    const graphicsData = graphicsProjectsData.filter((entry) => componentMap[entry.icon1]);

    const motionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const graphicsRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [visibleStates, setVisibleStates] = useState<boolean[]>(
        new Array(items.length).fill(false)
    );

    useEffect(() => {

        // Only run observer if not on mobile (doesn't actually work for unknown reason...)
        if (typeof window !== "undefined" && window.innerWidth < 640) {
            return;
        }
        
        const observers: IntersectionObserver[] = [];

        motionRefs.current.forEach((el, index) => {
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                setVisibleStates((prev) => {
                    const updated = [...prev];
                    updated[index] = entry.isIntersecting;
                    return updated;
                });
                },
                // Threshold tied to overflow-scroll box and not entire screen (doesn't work as intended...)
                { threshold: 0.5 }
            );

            observer.observe(el);
            observers.push(observer);
            });

            return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [motionData.length]);

    useEffect(() => {

        // Only run observer if not on mobile (doesn't actually work for unknown reason...)
        if (typeof window !== "undefined" && window.innerWidth < 640) {
            return;
        }
        
        const observers: IntersectionObserver[] = [];

        graphicsRefs.current.forEach((el, index) => {
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                setVisibleStates((prev) => {
                    const updated = [...prev];
                    updated[index] = entry.isIntersecting;
                    return updated;
                });
                },
                // Threshold tied to overflow-scroll box and not entire screen (doesn't work as intended...)
                { threshold: 0.5 }
            );

            observer.observe(el);
            observers.push(observer);
            });

            return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [graphicsData.length]);
    
    const motionTrigger = useRef<HTMLDivElement>(null);
    const graphicsTrigger = useRef<HTMLDivElement>(null);

    const [showMotion, setShowMotion] = useState(false);
    const [showGraphics, setShowGraphics] = useState(false);

    useEffect(() => {

        const options = { threshold: 0.6 };

        const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.id;
            const visible = entry.isIntersecting;

            if (id === "graphics") setShowMotion(visible);
            if (id === "motion") setShowGraphics(visible);
        });
        }, options);

        if (motionTrigger.current) observer.observe(motionTrigger.current);
        if (graphicsTrigger.current) observer.observe(graphicsTrigger.current);

        return () => {
        observer.disconnect();
        };
    }, []);

    return (
        <>
            <div className="absolute w-full h-full overflow-scroll opacity-0 pointer-events-none">
                <section id="motion" ref={motionTrigger} className="relative w-full h-screen"></section>
                <section id="graphics" ref={graphicsTrigger} className="relative w-full h-screen"></section>
            </div>
        {/* faded edge desktop */}
            <div className="opacity-100 pointer-events-none absolute w-full h-32 bg-gradient-to-b from-black/100 via-black/70 to-black/0 z-30 transition-opacity duration-1000 max-sm:hidden"></div>
        {/* faded edge mobile */}
        <div className="opacity-0 max-sm:opacity-100 pointer-events-none max-sm:visible max-sm:absolute max-sm:w-full max-sm:h-48 bg-gradient-to-b from-black/90 via-black/70 to-black/0 max-sm:z-30 transition-opacity duration-1000"></div>
        {/* slider */}
            <section className={`
            col-start-5 col-end-9 h-18 flex flex-col justify-end items-center z-50 relative
            max-sm:col-start-1 max-sm:col-end-10 max-sm:h-26 max-sm:ml-[20%] max-sm:mr-[10%]
            `}>
                <div className="w-full h-10 flex flex-row relative
                border-2 border-white rounded-full
                max-sm:flex-col max-sm:w-full max-sm:h-22 max-sm:rounded-3xl
                "> 
                    <a  href="#motion" className={`${showMotion ? "" : "pointer-events-none"}
                    hover:scale-90 transition-all duration-300 z-10
                    w-1/2 flex justify-center items-center
                    max-sm:w-full max-sm:h-1/2
                    `}>
                        {/* ping effect */}
                        <div className="w-2 h-2 rounded-full bg-white mr-2 -ml-4 max-sm:-ml-2 max-sm:hidden">
                            <div className="w-2 h-2 rounded-full bg-white
                            animate-[pingani_2s_ease-in-out_1.4s_infinite]
                            "></div>
                        </div>
                        <p className={`${showMotion ? "text-white" : "text-black"}
                        font-aktiv !text-md text-black
                        transition-all duration-500`}>Motion Design</p>
                    </a>
                    <a  href="#graphics" className={`${showGraphics ? "" : "pointer-events-none"}
                    hover:scale-90 transition-all duration-300 z-10
                    w-1/2 flex justify-center items-center
                    max-sm:w-full max-sm:h-1/2
                    `}>
                        {/* ping effect */}
                        <div className="w-2 h-2 rounded-full bg-white mr-2 -ml-4 max-sm:-ml-2 max-sm:hidden">
                            <div className="w-2 h-2 rounded-full bg-white
                            animate-[pingani_2s_ease-in-out_1.4s_infinite]
                            "></div>
                        </div>
                        <p className={`${showGraphics ? "text-white" : "text-black"}
                        font-aktiv !text-md text-black
                        transition-all duration-500`}>Graphic Design</p>
                    </a>
                    <div className={`${showMotion ? "translate-x-full max-sm:translate-x-0 max-sm:translate-y-full" : "translate-x-0 max-sm:translate-y-0"}
                    transition-all duration-500
                    w-1/2 h-full rounded-full absolute bg-white -z-10
                    max-sm:w-full max-sm:h-1/2
                    `}>
                    </div>
                </div>
            </section>
        {/* motion */}
            <section className={`${showMotion ? "opacity-0 pointer-events-none" : "opacity-100"}
            transition-opacity duration-1000
            col-start-1 col-end-13 flex flex-col justify-start items-start 
            pt-32 h-full gap-12 overflow-y-scroll absolute z-0
            max-sm:pt-44
            `}>
                {motionData.map((entry, j) => {
                const Icon1  = componentMap[entry.icon1];
                const Icon2 = componentMap[entry.icon2];
                const Icon3 = componentMap[entry.icon3];
                const Icon4 = componentMap[entry.icon4];
                
                return (
                    <section key={j} className="grid grid-cols-12 gap-4 -mt-4
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
                                        alt={entry.logoAlt}
                                        width={640}
                                        height={640}
                                        priority
                                    />
                                </div>
                            </div>
                            <p className="font-nunito">{entry.description}</p>
                            <div className="relative flex flex-row gap-2 pt-8 mt-8 border-t-2 border-white/50 w-fit
                            max-sm:pt-4 max-sm:mt-4
                            ">
                                {Icon1 && <Icon1/>}
                                {Icon2 && <Icon2/>}
                                {Icon3 && <Icon3/>}
                                {Icon4 && <Icon4/>}
                            </div>
                        </article>
                        <div ref={
                            ((el: HTMLDivElement | null) => {
                                motionRefs.current[j] = el;
                            }) as React.Ref<HTMLDivElement>
                        }
                        className={`${visibleStates[j] ? "ink-mask-inview" : "ink-mask-outview"}
                        relative col-start-8 col-end-11 flex flex-col justify-start items-start m-8
                        rounded-2xl overflow-hidden
                        max-sm:m-2 max-sm:ml-4 max-sm:mb-7
                        `}>
                            <Image 
                                className="object-contain w-full h-auto"
                                src={entry.thumbnail}
                                alt={entry.thumbnailAlt}
                                width={640}
                                height={640}
                                priority
                            />
                            {/* <video className="absolute"
                            src={entry.video} 
                            poster={entry.videoThumbnail}
                            autoPlay
                            muted
                            loop
                            playsInline/> */}
                        </div>
                        <hr className="col-start-3 col-end-11 h-0.5 bg-linear-to-r from-white/0 via-white/100 to-white/0 opacity-50 border-none" />
                    </section>
                )})}
            </section>
        {/* graphics */}
            <section className={`${showGraphics ? "opacity-0 pointer-events-none" : "opacity-100"}
            transition-opacity duration-1000
            col-start-1 col-end-13 flex flex-col justify-start items-start 
            pt-32 h-full gap-12 overflow-y-scroll absolute z-0
            max-sm:pt-44
            `}>
                {graphicsData.map((entry, i) => {
                const Icon1  = componentMap[entry.icon1];
                const Icon2 = componentMap[entry.icon2];
                const Icon3 = componentMap[entry.icon3];
                const Icon4 = componentMap[entry.icon4];
                
                return (
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
                                        alt={entry.logoAlt}
                                        width={640}
                                        height={640}
                                        priority
                                    />
                                </div>
                            </div>
                            <p className="font-nunito">{entry.description}</p>
                            <div className="relative flex flex-row gap-2 pt-8 mt-8 border-t-2 border-white/50 w-fit
                            max-sm:pt-4 max-sm:mt-4
                            ">
                                {Icon1 && <Icon1/>}
                                {Icon2 && <Icon2/>}
                                {Icon3 && <Icon3/>}
                                {Icon4 && <Icon4/>}
                            </div>
                        </article>
                        <div ref={
                            ((el: HTMLDivElement | null) => {
                                graphicsRefs.current[i] = el;
                            }) as React.Ref<HTMLDivElement>
                        }
                        className={`${visibleStates[i] ? "ink-mask-inview" : "ink-mask-outview"}
                        relative col-start-8 col-end-11 flex flex-col justify-start items-start m-8
                        rounded-2xl overflow-hidden
                        max-sm:m-2 max-sm:ml-4 max-sm:mb-7
                        `}>
                            <Image 
                                className="object-contain w-full h-auto"
                                src={entry.thumbnail}
                                alt={entry.thumbnailAlt}
                                width={640}
                                height={640}
                                priority
                            />
                        </div>
                        <hr className="col-start-3 col-end-11 h-0.5 bg-linear-to-r from-white/0 via-white/100 to-white/0 opacity-50 border-none" />
                    </section>
                )})}
            </section>
        </>
    );
}