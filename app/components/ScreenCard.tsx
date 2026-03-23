"use client";

import { useState } from "react";
import Image from "next/image";
import type { Screen } from "../data/types";

const NOTCH_PATH = "M0 16 C0 7.16 7.16 0 16 0 H384 C392.84 0 400 7.16 400 16 V438 C400 446.84 392.84 454 384 454 H259 C252 454 245 458 241 464 L225 489 C221 496 214 500 207 500 H16 C7.16 500 0 492.84 0 484 V16 Z";

export default function ScreenCard({ screen, index }: { screen: Screen; index: number }) {
    const [selected, setSelected] = useState(false);
    const clipId = `screen-clip-${index}`;

    return (
        <div className="flex flex-col gap-3 cursor-pointer" onClick={() => setSelected((s) => !s)}>
            <div className="relative aspect-4/5"
            style={{ backgroundColor: selected ? "#00BBFF" : "transparent" }}>
                {/* Clip path */}
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <clipPath id={clipId} clipPathUnits="objectBoundingBox" transform="scale(0.0025 0.002)">
                            <path d={NOTCH_PATH} />
                        </clipPath>
                    </defs>
                </svg>

                {/* Clipped media */}
                <div className="absolute inset-0" style={{ clipPath: `url(#${clipId})` }}>
                    {screen.type === "video" ? (
                        <video
                            className="absolute inset-0 w-full h-full object-cover"
                            src={screen.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <Image src={screen.src} alt={screen.label ?? ""} fill className="object-cover" />
                    )}
                </div>

                {/* Label in notch */}
                {screen.label && (
                    <div className="absolute flex items-center justify-center w-full h-8 bottom-0 pr-2 pointer-events-none">
                        <span
                            className="font-aktiv text-[12px] leading-none inline-block max-w-20 text-right px-1.5 rounded transition-colors duration-200"
                        >
                            {screen.label}
                        </span>
                    </div>
                )}

                {/* Border — white normally, blue when selected */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 400 500"
                    overflow="visible"
                >
                    <path
                        d={NOTCH_PATH}
                        fill="none"
                        stroke={selected ? "rgba(0,187,255,1)" : "rgba(255,255,255,1)"}
                        strokeWidth="4"
                        style={{ transition: "stroke 0.2s ease-in-out" }}
                    />
                </svg>
            </div>

            {/* Description — fades in below on click */}
            <div
                className="font-nunito text-sm text-black/70 leading-relaxed transition-opacity duration-300 pointer-events-none"
                style={{ opacity: selected ? 1 : 0, minHeight: "1.25rem" }}
            >
                {screen.description}
            </div>
        </div>
    );
}
