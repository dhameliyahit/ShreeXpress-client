import React, { useContext, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { TopBar } from "../TopBar";
import ThemeContext from "../../context/Theme/ThemeContext";

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const { theme } = useContext(ThemeContext);
    const [isSticky, setIsSticky] = useState(false);

    //for mapping our Links
    const navigationLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Pickup Request", path: "/pickup-request" },
        { name: "Contact Us", path: "/contact-us" },
        { name: "Franchise Inquiry", path: "/franchise-inquiry" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 60);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <>
            <TopBar />
            <div className={`${isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : ""}  flex justify-between items-center py-2 transition-all duration-300 ${theme === 'dark' ? 'bg-[#0C1017] border-b border-[#1F242A]' : 'bg-white'}`}>
                <Link to="/">
                    <div className="md:px-5">
                        {" "}
                        {/* Logo & name Component */}
                        <img
                            className="w-60"
                            src={theme === 'dark' ? "/assets/ShreeXpressLogoDark.png" : "/assets/ShreeXpressLogo.png"}
                            alt="ShreeMahavir courier Logo"
                        />
                    </div>
                </Link>

                <div className="pr-4 hidden md:flex items-center text-center">
                    {navigationLinks.map((link, index) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link key={index} to={link.path}
                                className={`mx-2 uppercase text-sm font-semibold transition duration-200 border-b-2 
                                    ${isActive ? "text-[#E31E25] border-[#E31E25]" : "border-transparent"}
                                    hover:border-[#E31E25] hover:text-[#E31E25]`} >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* ------------------------------------*/}

                {/* Mobile View Nav Link's */}
                <button className="md:hidden sm:flex border px-4 py-4 text-2xl mx-2 cursor-pointer"
                    onClick={() => setIsSidebarOpen(true)} >
                    <RxHamburgerMenu />
                </button>
                <div
                    className={`fixed top-0 left-0 h-full w-64 bg-white text-black  shadow-lg z-50 transform transition-transform duration-300 
                            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} `} >
                    <div className="flex items-center justify-between p-4 border-b">
                        <img src={"/assets/ShreeXpressLogo.png"} alt="" className="max-w-[150px]" />
                        {/* <h2 className="text-lg font-semibold">Menu</h2> */}
                        <button onClick={() => setIsSidebarOpen(false)} className="text-2xl cursor-pointer">
                            <IoMdClose />
                        </button>
                    </div>

                    <nav className="flex flex-col p-4">
                        {navigationLinks.map((link, index) => (
                            <Link key={index} to={link.path}
                                className="py-3 transition-all text-base font-medium uppercase border-b hover:text-[#E31E25]"
                                onClick={() => setIsSidebarOpen(false)} // close sidebar on link click
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Overlay Background (optional for outside click) */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-30 z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}
            </div>
        </>
    );
};

export default Header;
