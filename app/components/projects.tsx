import projectsData from "../../public/data/projects.json";
import Image from "next/image";

export default function Projects() {
    return (
        <section className="col-start-1 col-end-13 flex flex-col justify-start items-start 
        pt-24 h-full gap-12 overflow-y-scroll">
            {projectsData.map((entry, i) => (
                <section key={i} className="grid grid-cols-12 gap-4">
                    <article className="col-start-3 col-end-8 p-8">
                        <div className="relative flex flex-row justify-between">
                            <div>
                                <h2 className="font-aktiv !text-4xl pb-4">{entry.title}</h2>
                                <p className="font-nunito !text-md -mt-4 mb-4 opacity-60">{entry.subtitle}</p>
                            </div>
                            <div className="w-16 h-16">
                                <Image 
                                    className="object-contain w-full h-full"
                                    src={entry.logo}
                                    alt="Yipper profile"
                                    width={640}
                                    height={640}
                                    priority
                                />
                            </div>
                        </div>
                        <p className="font-nunito">{entry.description}</p>
                    </article>
                    {/* <div style={{ backgroundImage: `url(${entry.thumbnail})`}}
                    className="col-start-9 col-end-11 bg-amber-600
                    bg-cover bg-center w-full z-50
                    "></div> */}
                    <div className="relative col-start-8 col-end-11 flex flex-col justify-start items-start m-8
                    rounded-2xl overflow-hidden
                    ">
                        <Image 
                            className="object-contain w-full h-auto"
                            src={entry.thumbnail}
                            alt="Yipper profile"
                            width={640}
                            height={640}
                            priority
                        />
                    </div>
                    <hr className="col-start-3 col-end-11 h-0.5 bg-linear-to-r from-white/0 via-white/100 to-white/0 opacity-50 border-none" />
                    {/* <hr className="col-start-3 col-end-11 h-0.5 bg-white opacity-50 rounded-md border-none" /> */}
                </section>
            ))}
        </section>
    );
}