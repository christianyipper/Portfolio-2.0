"use client"

import bioData from "../../public/data/about.json";
import Image from "next/image";

import AfterEffects from "../svg/aftereffects";
import Figma from "../svg/figma";
import Illustrator from "../svg/illustrator";
import Next from "../svg/next";
import Photoshop from "../svg/photoshop";
import Premiere from "../svg/premiere";
import React from "../svg/react";
import Tailwind from "../svg/tailwind";
import Webflow from "../svg/webflow";

export default function About() {
    return (
        <section className="col-start-3 col-end-11 flex justify-center items-start pt-24 h-full">
            <div className="relative w-full p-8 overflow-hidden">
                <h2 className="font-aktiv text-4xl pb-4">About Me</h2>
                <article className="space-y-4 text-base text-white font-nunito pb-8">
                    {bioData.bio.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </article>
                <div className="flex flex-row justify-between">
                    <div className="border-t-2 border-white/50 pt-8
                    relative w-fit flex flex-row justify-center items-center gap-4 ">
                        <Image 
                            className="rounded-full"
                            src="/img/yipper-pfp-a75.png"
                            alt="Yipper profile"
                            width={64}
                            height={64}
                            priority
                        />
                        <article>
                            <p className="font-nunito">Christian Yip</p>
                            <p className="font-aktiv">Graphics Artist</p>
                        </article>
                    </div>
                    <div className="flex flex-row justify-center items-center pt-8 gap-9 h-full">
                        <div className="">
                            <div className="flex flex-row gap-2">
                                <AfterEffects/>
                                <Premiere/>
                                <Illustrator/>
                                <Photoshop/>
                            </div>
                            <p className="font-nunito !text-[14px] opacity-50 w-full text-center mt-2.5 pt-1 border-t-2 border-white/50">Creative proficiencies</p>
                        </div>
                        <div>
                            <div className="flex flex-row gap-2">
                                <React/>
                                <Next/>
                                <Tailwind/>
                                <Webflow/>
                                <Figma/>
                            </div>
                            <p className="font-nunito !text-[14px] opacity-50 w-full text-center mt-2.5 pt-1 border-t-2 border-white/50">Front-End proficiencies</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}