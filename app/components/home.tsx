"use client";

export default function Home() {
    return (
        <section className="relative flex justify-center items-center h-[calc(100vh-64px)]">
            <video
                src="/img/phone-bg.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute h-full w-auto"
            />
            <div className="absolute z-10 w-full p-8 bg-amber-500/50">
                <h2 className="font-zuume font-bold text-[64px] pb-4">Home</h2>
            </div>
            <div className="absolute bottom-0 w-full h-8 bg-amber-200"></div>
        </section>
    );
}
