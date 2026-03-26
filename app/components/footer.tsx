"use client";

import Copyright from "./copyright.jsx";

export default function Footer() {
    return (
        <section className="relative w-full h-64 p-8">
            <h3 className="font-zuume font-bold text-[64px] w-full text-center">Let&apos;s Work Together!</h3>
            <a
                href="mailto:christian@yipper.ca"
                className="group relative flex items-center justify-center mx-auto w-fit px-10 py-3 rounded-2xl border-2 border-transparent hover:border-[#00bbff] hover:bg-[#00bbff] hover:text-white text-[#00BBFF] transition-all ease duration-200 cursor-pointer"
            >
                <svg width="100%" height="100%" className="absolute inset-0 overflow-visible pointer-events-none">
                    <rect x="0" y="0" width="100%" height="100%" rx="16" ry="16" fill="none" stroke="#00BBFF" strokeWidth="2.5" strokeDasharray="10 8" style={{ animation: 'marching-ants 2s linear infinite' }} />
                </svg>
                <span className="font-zuume font-bold text-[32px] tracking-wide inline-block transition-transform duration-200 ease group-hover:scale-110">christian@yipper.ca</span>
            </a>
            <div>
                <Copyright />
            </div>
        </section>
    );
}
