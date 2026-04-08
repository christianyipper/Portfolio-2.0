import Image from "next/image";
import { notFound } from "next/navigation";
import motionProjectsData from "../../data/motion-projects";
import AfterEffects from "../../svg/aftereffects";
import Figma from "../../svg/figma";
import Illustrator from "../../svg/illustrator";
import Photoshop from "../../svg/photoshop";
import Premiere from "../../svg/premiere";
import PageWrapper from "../../components/PageWrapper";
import BackButton from "../../components/BackButton";
import Footer from "../../components/footer";
import ScreensSection from "../../components/ScreensSection";

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


const allProjects = motionProjectsData.map((p) => ({ ...p, category: "motion" }));

export function generateStaticParams() {
    return allProjects.map((p) => ({ slug: toSlug(p.title) }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = allProjects.find((p) => toSlug(p.title) === slug);
    if (!project) notFound();

    const icons = (project.icons ?? []).map((name) => componentMap[name]).filter(Boolean) as React.FC[];
    const screens = project.screens ?? [];

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
                            {project.year && (
                                <p className="-mb-4 font-aktiv text-sm text-[#00bbff] tracking-widest">{project.year}</p>
                            )}
                            <h1 className="font-zuume font-bold text-8xl leading-none">{project.title}</h1>
                            {project.subtitle && (
                                <p className="-mt-4 font-nunito text-xl text-black/50">{project.subtitle}</p>
                            )}
                            {project.description && (
                                <p className="font-nunito text-lg text-black/80 leading-relaxed max-w-2xl">{project.description}</p>
                            )}
                            {icons.length > 0 && (
                                <div className="flex flex-row gap-3">
                                    {icons.map((Icon, i) => <Icon key={i} />)}
                                </div>
                            )}
                        </div>

                        {/* Main video — plain, no notch */}
                        <div className="col-span-4">
                            <div className="relative aspect-4/5 rounded-xl overflow-hidden border-2 border-white">
                                {project.video ? (
                                    <video
                                        className="absolute inset-0 w-full h-full object-cover"
                                        src={project.video}
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

                    {screens.length > 0 && (
                        <ScreensSection
                            title={project.screensTitle ?? "Screens"}
                            screens={screens}
                            description={project.screensDescription}
                        />
                    )}

                    {project.backend && (
                        <section className="grid grid-cols-12 gap-8 bg-white rounded-4xl shadow-2xl p-8 items-start">
                            <div className="col-span-4 relative aspect-4/5 rounded-2xl overflow-hidden">
                                <Image src={project.backend.image} alt={project.backend.imageAlt} fill className="object-cover" />
                            </div>
                            <div className="col-span-8 flex flex-col gap-4">
                                <h2 className="font-zuume font-bold text-[64px] leading-none">Backend</h2>
                                <ul className="font-nunito text-base text-black/70 leading-relaxed list-disc list-inside flex flex-col gap-1">
                                    {project.backend.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}
                </div>
                <Footer />
            </div>
        </PageWrapper>
    );
}
