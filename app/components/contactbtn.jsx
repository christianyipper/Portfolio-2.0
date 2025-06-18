export default function ContactBtn() {
    return (
        <div className="absolute right-0 h-full flex items-center pl-2 overflow-hidden z-40">
            <div className="animate-[contactin_1s_ease_1.4s_forwards] translate-x-full
            w-full flex justify-center pt-2 
            ">
                <a href="#contact" className="group transition duration-200 -mr-2 hover:-translate-x-2">
                    <p className="pr-8 font-aktiv !text-2xl text-left">Contact</p>
                    <hr className="h-0.5 bg-white my-2"/>
                    <p className="pr-8 font-nunito text-left opacity-0
                    transition duration-200 group-hover:opacity-100">Reach out <br/> for inquiries</p>
                </a>
            </div>
        </div>
    );
}