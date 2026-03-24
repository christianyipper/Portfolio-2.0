"use client";

export default function Home() {
    return (
        <section className="relative grid grid-rows-[1fr_auto] items-center h-[calc(100vh-32px)] rounded-4xl">
            <video
                src="/img/s.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full min-h-0 object-cover mx-auto z-10"
            />
            <div className="relative w-full flex flex-col items-center justify-center pb-8 g-4">
                <div className="flex flex-col justify-center items-center px-16 py-4 rounded-4xl shadow-2xl z-10">
                    <h1 className="font-zuume font-bold text-[48px] -mt-2">Stop settling for static.</h1>
                    <div className="relative flex flex-row">
                        <a href="mailto:christian@yipper.ca" className="group relative h-14 -mt-4 flex items-center justify-center rounded-2xl text-[#00BBFF] hover:text-white cursor-pointer hover:bg-[#00BBFF] transition duration-200 ease ">
                        <span className="font-zuume font-bold text-[48px] inline-block transition-transform duration-200 ease group-hover:scale-90">Start your project.</span>
                        </a>
                        <img
                        src="/svg/down-arrow.svg"
                        alt="scroll down"
                        className="animate-[bounce-pause_1.8s_ease-in-out_infinite] -rotate-90 absolute -left-10 bottom-3 w-8 h-8"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
