import Image from "next/image";
import Navigation from "./components/navigation";
import Allpages from "./components/allpages";

export default function Home() {
    return (
        <main className="bg-black">
            <Navigation/>
            <Allpages/>
        </main>
    );
}
