"use client";

export default function Home() {
    return (
        <section className="relaitve grid grid-rows-[1fr_auto] justify-center items-center h-[calc(100vh-32px)] rounded-4xl">
            <video
                src="/img/yipper-logo-bg.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full min-h-0 object-cover mx-auto"
            />
            <div className="relative flex flex-col items-center justify-center p-8">
                <div className="flex flex-col w-full justify-center items-center">
                    <span className="font-zuume font-bold text-[48px]">Stop settling for static.</span>
                    <a href="mailto:christian@yipper.ca" className="group relative h-14 -mt-4 flex items-center justify-center rounded-2xl text-[#00BBFF] hover:text-white cursor-pointer hover:bg-[#00BBFF] transition duration-200 ease ">
                        <span className="font-zuume font-bold text-[48px] inline-block transition-transform duration-200 ease group-hover:scale-90">Start your project.</span>
                    </a>
                </div>
                <img
                    src="/svg/down-arrow.svg"
                    alt="scroll down"
                    className="animate-[bounce-pause_1.8s_ease-in-out_infinite] w-12 h-12"
                />
            </div>
        </section>
    );
}
