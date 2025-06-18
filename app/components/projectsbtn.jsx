export default function ProjectBtn() {
    return (
        <div className="absolute bottom-0 w-full flex justify-center pt-2 overflow-hidden z-40">
            <div className="animate-[projectsin_1s_ease_1.2s_forwards] translate-y-full
            w-full flex justify-center pt-2 
            ">
                <a href="#projects" className="relative flex flex-row items-start
                group transition duration-200 -mb-2 hover:-translate-y-2
                ">
                    <p className="pr-3 -mt-1 font-aktiv !text-2xl text-left">Projects</p>
                    <hr className="w-0.5 h-full bg-white mx-2"/>
                    <p className="pl-3 pb-4 font-nunito text-left opacity-0
                    transition duration-200 group-hover:opacity-100">Check out <br/> my work</p>
                </a>
            </div>
        </div>
    );
}