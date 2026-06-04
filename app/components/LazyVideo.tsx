"use client";

import { useEffect, useRef } from "react";

interface LazyVideoProps {
    src: string;
    className?: string;
    poster?: string;
}

export default function LazyVideo({ src, className, poster }: LazyVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.src = src;
                    video.load();
                    observer.disconnect();
                }
            },
            { rootMargin: "300px" }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [src]);

    return (
        <video
            ref={videoRef}
            className={className}
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
        />
    );
}
