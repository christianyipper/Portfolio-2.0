"use client"

import About from "./about";
import Projects from "./projects";

export default function Allpages() {
    return (
        <div className="flex flex-col gap-8">
            <section id="home" className="relative w-full min-h-screen">
            </section>

            <section id="projects" className="relative w-full">
                <Projects />
            </section>

            <section id="about" className="relative w-full">
                <About />
            </section>
        </div>
    );
}