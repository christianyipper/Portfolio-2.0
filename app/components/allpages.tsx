"use client"

import { useEffect, useRef, useState } from "react";
import About from "./about";
import Projects from "./projects";

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

        {/* about section */}
            <section className={`${showAbout ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            absolute w-full h-full grid grid-cols-12 gap-4
            transition-opacity duration-1000
            `}>
                <About />
            </section>

        {/* about navigation */}
            <section className={`${showAbout ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
            transition-opacity duration-500 
            `}>
                <div className="absolute left-0 h-full flex items-center z-40 pointer-events-none">
                    <div className="animate-[aboutin_1s_ease_1s_forwards] -translate-x-full
                    w-full flex justify-center pt-2 
                    ">
                        <div className="h-full flex items-center animate-[aboutani_2s_ease-in-out_1s_infinite_alternate] hover:[animation-play-state:paused]">
                            <a href="#about" className={`${showAbout ? "pointer-events-none" : "pointer-events-auto"}
                            group transition duration-300 -ml-2 hover:translate-x-2 pointer-events-auto
                            `}>
                                <p className="pl-10 font-aktiv !text-2xl text-right">About</p>
                                <hr className="h-0.5 bg-white my-2"/>
                                <p className="pl-10 font-nunito text-right opacity-0 
                                transition duration-300 group-hover:opacity-100
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
            `}>
                <Projects/>
            </section>

        {/* projects navigation */}
            <section className={`${showProjects ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
            transition-opacity duration-500 
            `}>
                <div className="absolute bottom-0 w-full flex justify-center pt-2 overflow-hidden z-40">
                    <div className="animate-[projectsin_1s_ease_1.2s_forwards] translate-y-full
                    w-full flex justify-center pt-2 
                    ">
                        <div className="relative h-full flex justify-center animate-[projectsani_2s_ease-in-out_1.4s_infinite_alternate] hover:[animation-play-state:paused]">
                            <a href="#projects" className="relative flex flex-row items-start
                            group transition duration-300 -mb-2 hover:-translate-y-2
                            ">
                                <p className="pr-3 -mt-1 font-aktiv !text-2xl text-left">Projects</p>
                                <hr className="w-0.5 h-full bg-white mx-2"/>
                                <p className="pl-3 pb-4 font-nunito text-left opacity-0
                                transition duration-300 group-hover:opacity-100">Check out <br/> my work</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        
        {/* contact section */}
            <section className={`${showContact ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
            transition-opacity duration-500 
            `}>

        {/* contact navigation */}
                <div className="absolute right-0 h-full flex items-center pl-2 overflow-hidden z-40 pointer-events-none">
                    <div className="animate-[contactin_1s_ease_1.4s_forwards] translate-x-full
                    w-full flex justify-center pt-2
                    ">
                        <div className="h-full flex items-center animate-[contactani_2s_ease-in-out_1.8s_infinite_alternate] hover:[animation-play-state:paused]">
                            <a href="#contact" className={`${showContact ? "pointer-events-none" : "pointer-events-auto"}
                            group transition duration-300 -mr-2 hover:-translate-x-2 pointer-events-auto
                            `}>
                                <p className="pr-8 font-aktiv !text-2xl text-left">Contact</p>
                                <hr className="h-0.5 bg-white my-2"/>
                                <p className="pr-8 font-nunito text-left opacity-0
                                transition duration-300 group-hover:opacity-100">Reach out <br/> for inquiries</p>
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
                <video className={`${showAbout || showProjects || showContact ? "blur-md" : "blur-none"} absolute w-full transition duration-1000 `} 
                src="/yipper-bg.webm" 
                autoPlay
                muted
                loop
                playsInline/>
            </div>
        </section>
        </>
    );
}