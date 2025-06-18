import Image from "next/image";
import Navigation from "./components/navigation";
import Allpages from "./components/allpages";

export default function Home() {
    return (
        <main className="">
            <div className="
            absolute w-screen h-full flex flex-row justify-center items-center 
            overflow-hidden
            ">
                <video className="absolute w-full" 
                src="/yipper-bgvideo.webm" 
                autoPlay
                muted
                loop
                playsInline/>
            </div>
            <Navigation/>
            <Allpages/>
        </main>
    );
}
