export interface Screen {
    src: string;
    type: "video" | "image";
    label?: string;
    description?: string;
}

export interface Backend {
    video: string;
    description: string[];
}

export interface Project {
    title: string;
    year?: string;
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
