import Navigation from "./components/navigation";
import Allpages from "./components/allpages";

export default function Home() {
    return (
        <main className="bg-white grid grid-cols-12 gap-8 min-h-screen">
            <div className="pl-8 col-span-9">
                <Allpages/>
            </div>
            <nav className="col-span-3 sticky top-0 h-screen">
                <Navigation/>
            </nav>
        </main>
    );
}
