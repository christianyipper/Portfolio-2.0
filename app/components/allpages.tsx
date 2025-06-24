"use client"

import { useEffect, useRef, useState } from "react";
import About from "./about";
import Projects from "./projects";
import Contact from "./contact";

export default function Allpages() {

    const aboutTrigger = useRef<HTMLDivElement>(null);
    const projectsTrigger = useRef<HTMLDivElement>(null);
    const contactTrigger = useRef<HTMLDivElement>(null);

    const [showAbout, setShowAbout] = useState(false);
    const [showProjects, setShowProjects] = useState(false);
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {

        const options = { threshold: 0.6 };

        const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.id;
            const visible = entry.isIntersecting;

            if (id === "about") setShowAbout(visible);
            if (id === "projects") setShowProjects(visible);
            if (id === "contact") setShowContact(visible);
        });
        }, options);

        if (aboutTrigger.current) observer.observe(aboutTrigger.current);
        if (projectsTrigger.current) observer.observe(projectsTrigger.current);
        if (contactTrigger.current) observer.observe(contactTrigger.current);

        return () => {
        observer.disconnect();
        };
    }, []);

    return (
        <>
            <div className="absolute w-full h-full overflow-scroll opacity-0 pointer-events-none">
                <section id="home" className="relative w-full h-screen"></section>
                <section id="about" ref={aboutTrigger} className="relative w-full h-screen"></section>
                <section id="projects" ref={projectsTrigger} className="relative w-full h-screen"></section>
                <section id="contact" ref={contactTrigger} className="relative w-full h-screen"></section>
            </div>

        {/* faded edge mobile */}
            <div className={`${showAbout || showProjects || showContact ? "opacity-0 max-sm:opacity-100 pointer-events-none max-sm:visible max-sm:absolute max-sm:w-full max-sm:h-48 bg-gradient-to-b from-black/90 via-black/70 to-black/0 max-sm:z-30" : "opacity-0" } transition-opacity duration-1000`}></div>
        {/* faded edge desktop */}
            <div className={`${showProjects ? "opacity-100 pointer-events-none absolute w-full h-32 bg-gradient-to-b from-black/100 via-black/70 to-black/0 z-30" : "opacity-0" } transition-opacity duration-1000 max-sm:hidden`}></div>

        {/* about section */}
            <section className={`${showAbout ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            absolute w-full h-full grid grid-cols-12 gap-4
            transition-opacity duration-1000
            max-sm:flex max-sm:flex-col max-sm:w-full
            `}>
                <About />
            </section>

        {/* about navigation */}
            <section className={`${showAbout ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
            transition-opacity duration-500 
            `}>
                <div className="absolute left-0 h-full flex items-center z-40 pointer-events-none
                max-sm:left-auto max-sm:right-0 max-sm:h-auto max-sm:w-32 max-sm:top-2 max-sm:overflow-hidden
                ">
                    <div className="animate-[aboutin_1s_ease_1s_forwards] -translate-x-full
                    w-full flex justify-center pt-2 
                    max-sm:animate-[contactin_1s_ease_1s_forwards] max-sm:translate-x-full
                    ">
                        <div className="h-full flex items-center animate-[aboutani_2s_ease-in-out_1s_infinite_alternate] hover:[animation-play-state:paused]
                        max-sm:animate-[contactani_2s_ease-in-out_1s_infinite_alternate] max-sm:w-full
                        ">
                            <a href="#about" className={`${showAbout ? "pointer-events-none" : "pointer-events-auto"}
                            group transition duration-300 -ml-2 hover:translate-x-2 pointer-events-auto
                            max-sm:ml-2 max-sm:w-full
                            `}>
                                <p className="pl-10 font-aktiv !text-2xl text-right 
                                max-sm:text-left max-sm:pl-0 max-sm:!text-xl
                                ">About</p>
                                <hr className="h-0.5 bg-white my-2 max-sm:w-full max-sm:my-1"/>
                                <p className="pl-10 font-nunito text-right opacity-0
                                transition duration-300 group-hover:opacity-100
                                max-sm:hidden
                                ">Learn more <br/> about me</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        {/* projects section */}
            <section className={`${showProjects ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            absolute w-full h-full grid grid-cols-12 gap-4
            transition-opacity duration-1000
            max-sm:pt-0
            `}>
                <Projects/>
            </section>

        {/* projects navigation */}
            <section className={`${showProjects ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
            transition-opacity duration-500 
            `}>
                <div className="absolute bottom-0 w-full flex justify-center pt-2 overflow-hidden z-40
                max-sm:w-32 max-sm:bottom-auto max-sm:right-0 max-sm:top-26
                ">
                    <div className="animate-[projectsin_1s_ease_1.2s_forwards] translate-y-full
                    w-full flex justify-center pt-2
                    max-sm:animate-[contactin_1s_ease_1.4s_forwards] max-sm:translate-y-0 max-sm:translate-x-full max-sm:pt-0
                    ">
                        <div className="relative h-full flex justify-center animate-[projectsani_2s_ease-in-out_1.4s_infinite_alternate] hover:[animation-play-state:paused]
                        max-sm:animate-[contactani_2s_ease-in-out_1.8s_infinite_alternate] max-sm:w-full
                        ">
                            <a href="#projects" className="relative flex flex-row items-start 
                            max-sm:flex-col
                            group transition duration-300 -mb-2 hover:-translate-y-2
                            max-sm:mb-0 ml-2 max-sm:w-full
                            ">
                                <p className="pr-3 -mt-1 font-aktiv !text-2xl text-left
                                max-sm:pr-0 max-sm:mt-0 max-sm:!text-xl
                                ">Projects</p>
                                <hr className="w-0.5 h-full bg-white mx-2
                                max-sm:w-full max-sm:h-0.5 max-sm:mx-0 max-sm:my-1
                                "/>
                                <p className="pl-3 max-sm:pr-8 pb-4 font-nunito text-left opacity-0
                                transition duration-300 group-hover:opacity-100
                                max-sm:hidden max-sm:pb-0
                                ">Check out <br/> my work</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        
        {/* contact section */}
            <section className={`${showContact ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            absolute w-full h-full grid grid-cols-12 gap-4
            transition-opacity duration-1000
            max-sm:flex max-sm:flex-col max-sm:w-full
            `}>
                <Contact/>
            </section>
        {/* contact navigation */}
            <section className={`${showContact ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
            transition-opacity duration-500 
            `}>
                <div className="absolute right-0 h-full flex items-center pl-2 overflow-hidden z-40 pointer-events-none
                max-sm:h-auto max-sm:top-14
                ">
                    <div className="animate-[contactin_1s_ease_1.4s_forwards] translate-x-full
                    w-full flex justify-center pt-2
                    max-sm:w-30 max-sm:animate-[contactin_1s_ease_1.2s_forwards]
                    ">
                        <div className="h-full flex items-center animate-[contactani_2s_ease-in-out_1.8s_infinite_alternate] hover:[animation-play-state:paused]
                        max-sm:w-full max-sm:animate-[contactani_2s_ease-in-out_1.4s_infinite_alternate]
                        ">
                            <a href="#contact" className={`${showContact ? "pointer-events-none" : "pointer-events-auto"}
                            group transition duration-300 -mr-2 hover:-translate-x-2 pointer-events-auto
                            max-sm:w-full
                            `}>
                                <p className="pr-8 font-aktiv !text-2xl text-left
                                max-sm:!text-xl
                                ">Contact</p>
                                <hr className="h-0.5 bg-white my-2 max-sm:my-1"/>
                                <p className="pr-8 font-nunito text-left opacity-0
                                transition duration-300 group-hover:opacity-100
                                max-sm:hidden
                                ">Reach out <br/> for inquiries</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        {/* background video */}
        <section className="animate-[fade_3s_ease_forwards] opacity-0 absolute w-screen h-full flex flex-row justify-center items-center overflow-hidden -z-10">
            <div className={`${showAbout || showProjects || showContact ? "brightness-75" : "brightness-100"} transition duration-1000
            relative w-full h-full flex flex-row justify-center items-center
            `}>
                <video className={`${showAbout || showProjects || showContact ? "blur-md" : "blur-none"} absolute w-full 
                max-sm:w-auto max-sm:h-screen max-sm:object-cover
                transition duration-1000
                `} 
                src="/yipper-bg.webm"
                poster="/blank-bg-wide.jpg"
                autoPlay
                muted
                loop
                playsInline/>
            </div>
        </section>
        </>
    );
}