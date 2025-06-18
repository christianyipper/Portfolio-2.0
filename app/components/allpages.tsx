"use client"

import { useEffect, useRef, useState } from "react";
import About from "./about";
import AboutBtn from "./aboutbtn";
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
            <div className="absolute w-full h-full overflow-scroll opacity-0">
                <section id="home" ref={homeTrigger} className="relative w-full h-screen"></section>
                <section id="about" ref={aboutTrigger} className="relative w-full h-screen"></section>
                <section id="projects" ref={projectsTrigger} className="relative w-full h-screen"></section>
                <section id="contact" ref={contactTrigger} className="relative w-full h-screen"></section>
            </div>
            <section className={`${showAbout ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            absolute w-full h-full grid grid-cols-12 gap-4
            transition-opacity duration-500
            `}>
                <About />
            </section>
            <section className={`${showAbout ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
            transition-opacity duration-500 
            `}>
                <AboutBtn/>
            </section>

            <section className={`${showProjects ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
            transition-opacity duration-500 
            `}>
                <ProjectsBtn/>
            </section>

            <section className={`${showContact ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
            transition-opacity duration-500 
            `}>
                <ContactBtn/>
            </section>
        </>
    );
}