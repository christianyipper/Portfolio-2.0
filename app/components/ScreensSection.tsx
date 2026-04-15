"use client";

import React from "react";
import Image from "next/image";
import type { Screen } from "../data/types";

const NOTCH_PATH = "M0 16 C0 7.16 7.16 0 16 0 H384 C392.84 0 400 7.16 400 16 V438 C400 446.84 392.84 454 384 454 H259 C252 454 245 458 241 464 L225 489 C221 496 214 500 207 500 H16 C7.16 500 0 492.84 0 484 V16 Z";

function ScreenCard({ screen, index }: { screen: Screen; index: number }) {
    const clipId = `screen-clip-${index}`;

    return (
        <div className="relative aspect-4/5 rounded-lg">
            <svg width="0" height="0" className="absolute">
                <defs>
                    <clipPath id={clipId} clipPathUnits="objectBoundingBox" transform="scale(0.0025 0.002)">
                        <path d={NOTCH_PATH} />
                    </clipPath>
                </defs>
            </svg>

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

            {screen.label && (
                <div className="absolute flex items-center justify-end w-full bottom-0 pr-2 pointer-events-none" style={{ height: "9.2%" }}>
                    <span className="font-aktiv text-[12px] leading-none inline-block max-w-20 text-right"
                        style={{ color: "black" }}>
                        {screen.label}
                    </span>
                </div>
            )}

            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 500" overflow="visible">
                <path
                    d={NOTCH_PATH}
                    fill="none"
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="4"
                />
            </svg>
        </div>
    );
}

export default function ScreensSection({ title, screens, description }: { title: string; screens: Screen[]; description?: string }) {
    const centered = screens.length < 4;

    return (
        <section className="flex flex-col gap-4 bg-white rounded-4xl shadow-2xl p-8">
            <h2 className="font-zuume font-bold text-[64px]">{title}</h2>

            <div className={`flex flex-row gap-4 ${centered ? "justify-center" : ""}`}>
                {screens.map((s, i) => (
                    <div key={i} className="w-1/4">
                        <ScreenCard screen={s} index={i} />
                    </div>
                ))}
            </div>

            {description && (
                <div className="col-span-12 font-nunito text-black/70 text-center leading-relaxed">
                    {description}
                </div>
            )}
        </section>
    );
}
