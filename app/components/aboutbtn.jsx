export default function AboutBtn() {
    return (
        <div className="absolute left-0 h-full flex items-center z-40">
            <a href="#about" className="group transition duration-200 -ml-2 hover:translate-x-2">
                <p className="pl-10 font-aktiv !text-2xl text-right">About</p>
                <hr className="h-0.5 bg-white my-2"/>
                <p className="pl-10 font-nunito text-right opacity-0 
                transition duration-200 group-hover:opacity-100
                ">Learn more <br/> about me</p>
            </a>
        </div>
    );
}