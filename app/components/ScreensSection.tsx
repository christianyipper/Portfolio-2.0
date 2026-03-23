"use client";

import { useState } from "react";
import React from "react";
import Image from "next/image";
import type { Screen } from "../data/types";

const NOTCH_PATH = "M0 16 C0 7.16 7.16 0 16 0 H384 C392.84 0 400 7.16 400 16 V438 C400 446.84 392.84 454 384 454 H259 C252 454 245 458 241 464 L225 489 C221 496 214 500 207 500 H16 C7.16 500 0 492.84 0 484 V16 Z";

function ScreenCard({ screen, index, selected, onClick }: {
    screen: Screen;
    index: number;
    selected: boolean;
    onClick: () => void;
}) {
    const clipId = `screen-clip-${index}`;
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative aspect-4/5 cursor-pointer rounded-lg"
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Blue bg: notch-height at rest, full card on hover */}
            <div
                className="absolute top-0 left-0 w-full rounded-lg transition-all duration-300"
                style={{
                    height: hovered || selected ? "100%" : "85%",
                    backgroundColor: "#00BBFF",
                    outline: "1px solid #00BBFF",
                }}
            />
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
                <div className="absolute flex items-center justify-end w-full bottom-0 pr-2 pointer-events-none" style={{ height: "9.2%" }}>
                    <span className="font-aktiv text-[12px] leading-none inline-block max-w-20 text-right"
                    style={{ color: hovered || selected ? "white" : "black", transition: "color 0.2s" }}>
                        {screen.label}
                    </span>
                </div>
            )}

            {/* Border */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 500"
                overflow="visible"
            >
                <path
                    d={NOTCH_PATH}
                    fill="none"
                    stroke={selected || hovered ? "rgba(0,187,255,1)" : "rgba(255,255,255,1)"}
                    strokeWidth="4"
                    style={{ transition: "stroke 0.2s ease-in-out" }}
                />
            </svg>
        </div>
    );
}

export default function ScreensSection({ title, screens }: { title: string; screens: Screen[] }) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

    const handleClick = (i: number) => setSelectedIndex((prev) => (prev === i ? null : i));

    const selectedScreen = selectedIndex !== null ? screens[selectedIndex] : null;

    return (
        <section className="grid grid-cols-12 gap-4 bg-white rounded-4xl shadow-2xl p-8">
            <h2 className="col-span-12 font-zuume font-bold text-[64px]">{title}</h2>

            {screens.map((s, i) => (
                <div key={i} className="col-span-3">
                    <ScreenCard screen={s} index={i} selected={selectedIndex === i} onClick={() => handleClick(i)} />
                </div>
            ))}

            {/* Full-width description row */}
            <div
                className="col-span-12 font-nunito text-sm text-black/70 leading-relaxed transition-opacity duration-300"
                style={{ opacity: selectedScreen?.description ? 1 : 0, minHeight: "1.25rem" }}
            >
                {selectedScreen?.description}
            </div>
        </section>
    );
}
