"use client"

import bioData from "../../public/data/about.json";
import Image from "next/image";

export default function About() {
    return (
        <section className="col-start-3 col-end-11 flex justify-center items-start pt-24 h-full">
            <div className="relative w-full p-8
            bg-black/20 backdrop-blur-md rounded-4xl overflow-hidden">
                <h2 className="font-aktiv text-4xl pb-4">About Me</h2>
                {/* <p>{bioData.bio}</p> */}
                <article className="space-y-4 text-base text-white font-nunito pb-8">
                    {bioData.bio.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </article>
                <div className="border-t-2 border-white/50 pt-8
                relative w-fit flex flex-row justify-center items-center gap-4 ">
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
                        <p className="font-aktiv">Graphics Artist</p>
                    </article>
                </div>
            </div>
        </section>
    );
}