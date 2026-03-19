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
import Footer from "../components/footer";

export default function About() {
    return (
        <div className="relative flex flex-col gap-4">
            <section className="flex justify-center items-start h-full bg-white p-8 rounded-4xl shadow-2xl
            ">
                <div className="relative w-full overflow-hidden
                max-sm:p-2 max-sm:pl-4
                ">
                    <div className="max-sm:border-b-2 border-black/20 max-sm:pb-8 max-sm:mb-8
                    relative flex flex-row justify-start items-center gap-4 w-0 h-0 pointer-events-none opacity-0
                    max-sm:opacity-100 max-sm:w-fit max-sm:h-auto
                    ">
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
                            <p className="font-aktiv">Creative Designer</p>
                        </article>
                    </div>
                    <h2 className="font-zuume font-bold text-[64px] pb-4">About Me</h2>
                    <article className="space-y-4 text-base text-black font-nunito pb-8">
                        {bioData.bio.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </article>
                    <div className="flex flex-row justify-between">
                        <div className="border-t-2 border-black/20 pt-8
                        relative w-fit flex flex-row justify-center items-center gap-4
                        max-sm:hidden
                        ">
                            <Image 
                                className="rounded-full"
                                src="/img/yipper-pfp.png"
                                alt="Yipper profile"
                                width={64}
                                height={64}
                                priority
                            />
                            <article>
                                <p className="font-nunito">Christian Yip</p>
                                <p className="font-aktiv">Creative Designer</p>
                            </article>
                        </div>
                        <div className="flex flex-row justify-center items-center pt-8 gap-9 h-full
                        max-sm:flex-col max-sm:w-full max-sm:pt-0 max-sm:pb-16
                        ">
                            <div className="">
                                <div className="flex flex-row gap-2">.
                                    <AfterEffects/>
                                    <Premiere/>
                                    <Illustrator/>
                                    <Photoshop/>
                                    <Figma/>
                                </div>
                                <p className="font-nunito !text-[14px] opacity-50 w-full text-center mt-2.5 pt-1 border-t-2 border-black/20">Creative Proficiencies</p>
                            </div>
                            <div>
                                <div className="flex flex-row gap-2">
                                    <React/>
                                    <Next/>
                                    <Tailwind/>
                                    <Webflow/>
                                </div>
                                <p className="font-nunito !text-[14px] opacity-50 w-full text-center mt-2.5 pt-1 border-t-2 border-black/20">Front-End Proficiencies</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}