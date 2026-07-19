import { notFound } from "next/navigation";
import photoGalleries from "../../data/photos";
import PageWrapper from "../../components/PageWrapper";
import BackButton from "../../components/BackButton";
import Footer from "../../components/footer";
import ProjectNav from "../../components/ProjectNav";
import PhotoGalleryGrid from "../../components/PhotoGalleryGrid";
import { toSlug } from "../../lib/slug";

export function generateStaticParams() {
    return photoGalleries.map((g) => ({ slug: toSlug(g.title) }));
}

export default async function PhotoGalleryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const gallery = photoGalleries.find((g) => toSlug(g.title) === slug);
    if (!gallery) notFound();

    const currentIndex = photoGalleries.findIndex((g) => toSlug(g.title) === slug);
    const makeNavGallery = (g: typeof photoGalleries[0]) => ({
        slug: toSlug(g.title),
        title: g.title,
        client: g.client,
        video: g.video,
        thumbnail: g.thumbnail,
        thumbnailAlt: g.thumbnailAlt,
    });
    const prevGallery = currentIndex > 0 ? makeNavGallery(photoGalleries[currentIndex - 1]) : undefined;
    const nextGallery = currentIndex < photoGalleries.length - 1 ? makeNavGallery(photoGalleries[currentIndex + 1]) : undefined;

    return (
        <PageWrapper key={slug}>
            <div className="flex flex-col mt-8 gap-4">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-12 gap-4 bg-white rounded-4xl shadow-2xl p-4 md:p-8">
                        <div className="col-span-12">
                            <BackButton to="/#photos" />
                        </div>

                        <div className="col-span-12 flex flex-col gap-4">
                            {gallery.client && (
                                <p className="-mb-4 font-aktiv font-black text-sm text-[#00bbff] tracking-widest">{gallery.client}</p>
                            )}
                            <h1 className="font-zuume font-bold text-[36px] md:text-8xl leading-none">{gallery.title}</h1>
                            {gallery.subtitle && (
                                <p className="-mt-4 font-nunito text-xl text-black/50">{gallery.subtitle}</p>
                            )}
                            {gallery.description && (
                                <p className="font-nunito text-lg text-black/80 leading-relaxed max-w-2xl">{gallery.description}</p>
                            )}
                        </div>
                    </div>

                    <section className="bg-white rounded-4xl shadow-2xl p-4 md:p-8">
                        <PhotoGalleryGrid images={gallery.images} />
                    </section>
                </div>
                <ProjectNav prev={prevGallery} next={nextGallery} />
                <Footer />
            </div>
        </PageWrapper>
    );
}
