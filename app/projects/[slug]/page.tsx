import Image from "next/image";
import { notFound } from "next/navigation";
import motionProjectsData from "../../../public/data/motion-projects.json";
import graphicsProjectsData from "../../../public/data/graphics-projects.json";
import AfterEffects from "../../svg/aftereffects";
import Figma from "../../svg/figma";
import Illustrator from "../../svg/illustrator";
import Photoshop from "../../svg/photoshop";
import Premiere from "../../svg/premiere";
import PageWrapper from "../../components/PageWrapper";
import BackButton from "../../components/BackButton";
import Footer from "../../components/footer";

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

const NOTCH_PATH = "M0 16 C0 7.16 7.16 0 16 0 H384 C392.84 0 400 7.16 400 16 V438 C400 446.84 392.84 454 384 454 H259 C252 454 245 458 241 464 L225 489 C221 496 214 500 207 500 H16 C7.16 500 0 492.84 0 484 V16 Z";

function ProcessCard({ src, label, index }: { src: string; label?: string; index: number }) {
    const clipId = `process-clip-${index}`;
    return (
        <div className="relative aspect-4/5">
            <svg width="0" height="0" className="absolute">
                <defs>
                    <clipPath id={clipId} clipPathUnits="objectBoundingBox" transform="scale(0.0025 0.002)">
                        <path d={NOTCH_PATH} />
                    </clipPath>
                </defs>
            </svg>

            {/* Clipped media */}
            <div className="absolute inset-0" style={{ clipPath: `url(#${clipId})` }}>
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            </div>

            {/* Label in notch — same style as projects page */}
            {label && (
                <div className="absolute flex items-center justify-end w-full h-8 -mb-1 bottom-0 pr-2 pointer-events-none">
                    <span className="font-aktiv text-[12px] leading-none inline-block max-w-20 wrap-break-word text-right">{label}</span>
                </div>
            )}

            {/* Border */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 500"
                overflow="visible"
            >
                <path d={NOTCH_PATH} fill="none" stroke="rgba(0,187,255,1)" strokeWidth="4" />
            </svg>
        </div>
    );
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

    const processes = [
        { src: ("process1" in project ? project.process1 : "") as string, label: ("process1Alt" in project ? project.process1Alt : "") as string },
        { src: ("process2" in project ? project.process2 : "") as string, label: ("process2Alt" in project ? project.process2Alt : "") as string },
        { src: ("process3" in project ? project.process3 : "") as string, label: ("process3Alt" in project ? project.process3Alt : "") as string },
        { src: ("process4" in project ? project.process4 : "") as string, label: ("process4Alt" in project ? project.process4Alt : "") as string },
    ].filter((p) => p.src);

    return (
        <PageWrapper>
            <div className="flex flex-col mt-8 gap-4">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-12 gap-4 bg-white rounded-4xl shadow-2xl p-8">

                        {/* Back button */}
                        <div className="col-span-12">
                            <BackButton />
                        </div>

                        {/* Row 1: Text (9 cols) + Main video (3 cols, portrait) */}
                        <div className="col-span-8 flex flex-col gap-4">
                            {"year" in project && project.year && (
                                <p className="font-aktiv text-sm text-[#00bbff] tracking-widest">{project.year as string}</p>
                            )}
                            <h1 className="font-zuume font-bold text-8xl leading-none">{project.title}</h1>
                            {project.subtitle && (
                                <p className="font-nunito text-xl text-black/50">{project.subtitle}</p>
                            )}
                            {project.description && (
                                <p className="font-nunito text-lg text-black/80 leading-relaxed max-w-2xl">{project.description}</p>
                            )}
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

                        {/* Main video — plain, no notch */}
                        <div className="col-span-4">
                            <div className="relative aspect-4/5 rounded-xl overflow-hidden border-2 border-white">
                                {"video" in project && project.video ? (
                                    <video
                                        className="absolute inset-0 w-full h-full object-cover"
                                        src={project.video as string}
                                        poster={project.thumbnail}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <Image src={project.thumbnail} alt={project.thumbnailAlt} fill className="object-cover" />
                                )}
                            </div>
                        </div>
                    </div>

                    <section className="grid grid-cols-12 gap-4 bg-white rounded-4xl shadow-2xl p-8">
                        <h2 className="col-span-12 row-start-1 font-zuume font-bold text-[64px]">The Process</h2>
                        
                        {/* Row 2: Process videos with notch + label */}
                        {processes.map((p, i) => (
                            <div key={i} className="col-span-3 row-start-2">
                                <ProcessCard src={p.src} label={p.label} index={i} />
                            </div>
                        ))}

                    </section>
                </div>
                <Footer />
            </div>
        </PageWrapper>
    );
}
