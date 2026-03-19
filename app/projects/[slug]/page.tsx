import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import motionProjectsData from "../../../public/data/motion-projects.json";
import graphicsProjectsData from "../../../public/data/graphics-projects.json";
import AfterEffects from "../../svg/aftereffects";
import Figma from "../../svg/figma";
import Illustrator from "../../svg/illustrator";
import Photoshop from "../../svg/photoshop";
import Premiere from "../../svg/premiere";

const componentMap: Record<string, React.FC> = {
    AfterEffects,
    Figma,
    Illustrator,
    Photoshop,
    Premiere,
};

function toSlug(title: string) {
    return title.toLowerCase().replace(/\s+/g, "-");
}

const allProjects = [
    ...motionProjectsData.map((p) => ({ ...p, category: "motion" })),
    ...graphicsProjectsData.map((p) => ({ ...p, category: "graphics" })),
];

export function generateStaticParams() {
    return allProjects.map((p) => ({ slug: toSlug(p.title) }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = allProjects.find((p) => toSlug(p.title) === slug);
    if (!project) notFound();

    const Icon1 = project.icon1 ? componentMap[project.icon1] : null;
    const Icon2 = project.icon2 ? componentMap[project.icon2] : null;
    const Icon3 = project.icon3 ? componentMap[project.icon3] : null;
    const Icon4 = project.icon4 ? componentMap[project.icon4] : null;

    return (
        <main className="min-h-screen bg-white">
            {/* Back button */}
            <div className="px-12 pt-10 pb-4">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 font-aktiv text-sm text-black/50 hover:text-black transition-colors duration-200"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                </Link>
            </div>

            <div className="px-12 pb-24 max-w-5xl">
                {/* Header */}
                <div className="flex items-start justify-between gap-8 mb-12">
                    <div>
                        {"year" in project && project.year && (
                            <p className="font-aktiv text-sm text-[#00bbff] tracking-widest mb-1">{project.year as string}</p>
                        )}
                        <h1 className="font-zuume font-bold text-[80px] leading-none">{project.title}</h1>
                        {project.subtitle && (
                            <p className="font-nunito text-xl text-black/50 mt-2">{project.subtitle}</p>
                        )}
                    </div>
                    {project.logo && (
                        <div className="relative w-24 h-20 shrink-0 mt-2">
                            <Image src={project.logo} alt={project.logoAlt} fill className="object-contain" />
                        </div>
                    )}
                </div>

                {/* Media */}
                <div className="w-full rounded-3xl overflow-hidden bg-black mb-12 aspect-video">
                    {"video" in project && project.video ? (
                        <video
                            className="w-full h-full object-cover"
                            src={project.video as string}
                            poster={project.thumbnail}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <div className="relative w-full h-full">
                            <Image
                                src={project.thumbnail}
                                alt={project.thumbnailAlt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Description */}
                {project.description && (
                    <p className="font-nunito text-lg text-black/80 leading-relaxed mb-12 max-w-2xl">
                        {project.description}
                    </p>
                )}

                {/* Tools */}
                {(Icon1 || Icon2 || Icon3 || Icon4) && (
                    <div>
                        <p className="font-nunito text-sm text-black/40 mb-3 uppercase tracking-widest">Tools Used</p>
                        <div className="flex flex-row gap-3">
                            {Icon1 && <Icon1 />}
                            {Icon2 && <Icon2 />}
                            {Icon3 && <Icon3 />}
                            {Icon4 && <Icon4 />}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
