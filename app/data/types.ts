export interface Screen {
    src: string;
    type: "video" | "image";
    label?: string;
    description?: string;
}

export interface Backend {
    video?: string;
    image?: string;
    imageAlt?: string;
    description: string[];
}

export interface Project {
    title: string;
    client?: string;
    subtitle?: string;
    description?: string;
    logo?: string;
    logoAlt?: string;
    thumbnail: string;
    thumbnailAlt: string;
    video?: string;
    videoThumbnail?: string;
    screensTitle?: string;
    screensDescription?: string;
    screens?: Screen[];
    backend?: Backend;
    icons?: string[];
}

export interface GalleryImage {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export interface PhotoGallery {
    title: string;
    client?: string;
    subtitle?: string;
    description?: string;
    thumbnail: string;
    thumbnailAlt: string;
    video?: string;
    images: GalleryImage[];
}
