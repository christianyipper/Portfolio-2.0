"use client"

import Home from "./home";
import About from "./about";
import Projects from "./projects";
import Gallery from "./gallery";

export default function Allpages() {
    return (
        <div className="flex flex-col gap-8 mt-8">
            <section id="home" className="relative w-full">
                <Home />
            </section>

            <section id="projects" className="relative w-full">
                <Projects />
            </section>

            <section id="gallery" className="relative w-full">
                <Gallery />
            </section>

            <section id="about" className="relative w-full">
                <About />
            </section>
        </div>
    );
}