import Image from "next/image";
import type { GalleryImage } from "../data/types";

export default function PhotoGalleryGrid({ images }: { images: GalleryImage[] }) {
    return (
        <div className="columns-2 sm:columns-3 gap-4">
            {images.map((photo, i) => (
                <div key={i} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl">
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        className="w-full h-auto object-cover"
                        sizes="(max-width: 640px) 50vw, 33vw"
                    />
                </div>
            ))}
        </div>
    );
}
