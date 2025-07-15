import React, { useEffect, useRef } from 'react';
import { FaArrowUp } from "react-icons/fa";

export default function Progress() {
    const progressRef = useRef(null);

    useEffect(() => {
        const calcScroll = () => {
            const progress = progressRef.current;
            const pos = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollValue = Math.round((pos * 100) / height);

            if (progress) {
                // Show/hide
                progress.style.display = pos > 100 ? "grid" : "none";

                // Set background
                progress.style.background = `conic-gradient(#2563eb ${scrollValue}%, #cbd5e1 ${scrollValue}%)`;
            }
        };

        // Add scroll and load event listeners
        window.addEventListener("scroll", calcScroll);
        window.addEventListener("load", calcScroll);

        return () => {
            window.removeEventListener("scroll", calcScroll);
            window.removeEventListener("load", calcScroll);
        };
    }, []);

    const scrollToTop = () => {
        document.documentElement.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div
            id="progress"
            ref={progressRef}
            onClick={scrollToTop}
            className="fixed z-[99999] bottom-5 right-5 h-[50px] w-[50px] rounded-full grid place-items-center cursor-pointer transition-all duration-300 ease-in-out"
            style={{ display: 'none' }}
        >
            <div
                id="progress-value"
                className="h-[calc(100% - 10px)] w-[calc(100% - 10px)] p-2 bg-white rounded-full grid place-items-center font-black text-[25px] text-black shadow-md transition-all duration-300 ease-in-out"
            >
                <FaArrowUp />
            </div>
        </div>
    );
}
