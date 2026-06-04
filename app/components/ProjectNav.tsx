"use client";

import Image from "next/image";
import { useTransition } from "../context/TransitionContext";
import LazyVideo from "./LazyVideo";

interface NavProject {
    slug: string;
    title: string;
    client?: string;
    video?: string;
    thumbnail: string;
    thumbnailAlt: string;
}

function NavCard({ project, label }: { project: NavProject; label: string }) {
    const { navigate } = useTransition();

    return (
        <div
            className="flex-1 bg-white rounded-4xl shadow-2xl overflow-hidden cursor-pointer group"
            onClick={() => navigate(`/projects/${project.slug}`)}
        >
            <div className="relative aspect-video w-full overflow-hidden">
                {project.video ? (
                    <LazyVideo
                        src={project.video}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                ) : (
                    <Image
                        src={project.thumbnail}
                        alt={project.thumbnailAlt}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                )}
            </div>
            <div className="p-6 flex flex-col gap-1">
                <span className="font-aktiv text-xs text-[#00bbff] tracking-widest uppercase">{label}</span>
                {project.client && (
                    <span className="font-aktiv text-sm text-black/50 tracking-widest uppercase">{project.client}</span>
                )}
                <h3 className="font-zuume font-bold text-[32px] leading-none">{project.title}</h3>
            </div>
        </div>
    );
}

export default function ProjectNav({ prev, next }: { prev?: NavProject; next?: NavProject }) {
    if (!prev && !next) return null;

    return (
        <div className="flex flex-row gap-4">
            {prev ? (
                <NavCard project={prev} label="Previous" />
            ) : (
                <div className="flex-1" />
            )}
            {next ? (
                <NavCard project={next} label="Next" />
            ) : (
                <div className="flex-1" />
            )}
        </div>
    );
}
