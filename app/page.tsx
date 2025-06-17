import Image from "next/image";

export default function Home() {
    return (
        <main>
        <div className="
        absolute w-full h-full flex flex-row justify-center items-center 
        overflow-hidden
        ">
            <video className="absolute w-full" 
            src="/yipper-bgvideo.webm" 
            autoPlay
            muted
            loop
            playsInline/>
        </div>
        </main>
    );
}
