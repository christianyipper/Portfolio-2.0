"use client"

import { useEffect, useRef, useState } from "react";
import About from "./about";
import AboutBtn from "./aboutbtn";
import Projects from "./projects";
import ProjectsBtn from "./projectsbtn";
import ContactBtn from "./contactbtn";

export default function Allpages() {

    const homeTrigger = useRef<HTMLDivElement>(null);
    const aboutTrigger = useRef<HTMLDivElement>(null);
    const projectsTrigger = useRef<HTMLDivElement>(null);
    const contactTrigger = useRef<HTMLDivElement>(null);

    const [showHome, setShowHome] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showProjects, setShowProjects] = useState(false);
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        const options = { threshold: 0.6 };

        const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.id;
            const visible = entry.isIntersecting;

            if (id === "home") setShowHome(visible);
            if (id === "about") setShowAbout(visible);
            if (id === "projects") setShowProjects(visible);
            if (id === "contact") setShowContact(visible);
        });
        }, options);

        if (homeTrigger.current) observer.observe(homeTrigger.current);
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
                <section id="home" ref={homeTrigger} className="relative w-full h-screen"></section>
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
            <section className={`${showAbout ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
            transition-opacity duration-500 
            `}>
                <AboutBtn/>
            </section>

        {/* projects section */}
            <section className={`${showProjects ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            absolute w-full h-full grid grid-cols-12 gap-4
            transition-opacity duration-1000
            `}>
                <Projects/>
            </section>
            <section className={`${showProjects ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
            transition-opacity duration-500 
            `}>
                <ProjectsBtn/>
            </section>
        
        {/* contact section */}
            <section className={`${showContact ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
            transition-opacity duration-500 
            `}>
                <ContactBtn/>
            </section>

        {/* background video */}
        <section className="animate-[fade_3s_ease_forwards] opacity-0 absolute w-screen h-full flex flex-row justify-center items-center overflow-hidden -z-10">
            <div className={`${showAbout || showProjects || showContact ? "brightness-75" : "brightness-100"} transition duration-1000
            relative w-full h-full flex flex-row justify-center items-center
            `}>
                <video className={`${showAbout || showProjects || showContact ? "blur-md" : "blur-none"} absolute w-full transition duration-1000 `} 
                src="/yipper-bgvideo-21.webm" 
                autoPlay
                muted
                loop
                playsInline/>
            </div>
        </section>
        </>
    );
}