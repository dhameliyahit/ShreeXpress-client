import React, { useState } from 'react'
import { TopBar } from '../TopBar'
import Layout from '../Layout/Layout';
import { FaRocket, FaShieldAlt, FaGlobe } from "react-icons/fa";
import Typewriter from 'typewriter-effect';

const HomeBG = "./assets/HomeBG.jpg"; // Adjust the path as necessary

const HomePage = () => {


    return (
        <>
            <TopBar /> {/* This is the Top bar callusnow** component 🔝 */}
            <Layout>
                <HeroSection /> {/* This is the Hero section callusnow** component 🔝 */}
                <QuickAccessSection /> {/* This is the Quick Access section callusnow** component 🔝 */}
                <AboutUs />
            </Layout>
        </>
    )
}


const HeroSection = () => {

    return (
        <div className="relative w-full h-[80vh]">
            <img
                src={HomeBG}
                alt="Home Background"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-left">
                <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                    <span className="text-1xl md:text-3xl block mb-1">Welcome,</span>
                    <span className="text-5xl md:text-7xl text-[#C52024] font-bold block">
                        ShreeXpress
                    </span>
                    <span className="text-1xl md:text-2xl mt-3 font-bold block">
                        Courier Service pvt. ltd.
                    </span>
                    <span className="text-sm md:text-lg inline-flex items-center mt-1">
                        {/* Added Typewriter Animation */}
                        <span className='mr-2'>We Deliver — </span> <Typewriter options={{
                            strings: [' Fast.', ' Safe.', ' Reliable.'],
                            autoStart: true,
                            loop: true,
                        }} />
                    </span>
                </h1>
            </div>
        </div>
    );
};

const QuickAccessSection = () => {
    const branchList = [
        "Surat - Ring Road Branch",
        "Ahmedabad - CG Road Branch",
        "Vadodara - Alkapuri Branch",
        "Rajkot - Kalawad Road Branch",
        "Bharuch - Station Road Branch",
    ];

    const [searchText, setSearchText] = useState("");
    const [filteredBranches, setFilteredBranches] = useState([]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);

        if (value.trim()) {
            const filtered = branchList.filter((branch) =>
                branch.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredBranches(filtered);
        } else {
            setFilteredBranches([]);
        }
    };

    return (
        <section className="bg-white backdrop-blur-md py-3 px-4 md:px-10">
            <div className="max-w-5xl mx-auto grid grid-cols-1 text-lg md:grid-cols-2 gap-6 bg-white/60 p-6 md:p-10 border border-white/20">
                {/* Track Consignment */}
                <div className='shadow-2xl p-5 border border-[#383185]'>
                    <div className='mb-2 flex items-center'>
                        <div className='relative left-0 w-8 h-2 mx-2 bg-[#383185]'></div>
                        <h2 className="font-semibold text-gray-800">Track Your Consignment</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            placeholder="Enter Consignment No."
                            className="w-full focus:outline-none focus:ring-1 focus:ring-[#383185] border border-gray-300 bg-white text-black placeholder-gray-500 rounded px-4 py-3 text-sm"
                        />
                        <button className="bg-[#383185] cursor-pointer text-white px-4 py-2 rounded transition- duration-700 hover:bg-[#C52024]">
                            TRACK
                        </button>
                    </div>
                    <p className="text-sm text-gray-400 font-semibold mt-1">
                        Shipment numbers separated by commas (e.g. 123456789123, 123456789123)
                    </p>
                </div>

                {/* Find Outlet */}
                <div className="relative shadow-2xl p-5 border border-[#383185]">
                    <div className='mb-2 flex items-center'>
                        <div className='relative left-0 w-8 h-2 mx-2 bg-[#383185]'></div>
                        <h2 className="font-semibold text-gray-800">Find Our Outlet</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            placeholder="Search Branch / Pincode"
                            className="w-full focus:outline-none focus:ring-1 focus:ring-[#383185] border border-gray-300 bg-white text-black placeholder-gray-500 rounded px-4 py-3 text-sm"
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                        <button className="bg-[#383185] cursor-pointer text-white px-4 py-2 rounded transition-all duration-700 hover:bg-[#C52024]">
                            SEARCH
                        </button>
                    </div>

                    {/* Suggestions */}
                    {filteredBranches.length > 0 && (
                        <ul className="absolute z-20 bg-yellow-100 border border-yellow-300 w-full mt-2 rounded shadow max-h-40 overflow-y-auto text-sm">
                            {filteredBranches.map((branch, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 hover:bg-yellow-200 cursor-pointer"
                                    onClick={() => {
                                        setSearchText(branch);
                                        setFilteredBranches([]);
                                    }}
                                >
                                    {branch}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};


const AboutUs = () => {
    const AboutUsImg = './assets/AboutUsImg.png'
    return (
        <section className="bg-white py-12 px-4 md:px-10 border-t-2 border-[#393187]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-5">
                {/* Left Content */}
                <div>
                    {/* Add Shadow Text */}
                    <h1 className="font-bold text-wrap text-gray-300 opacity-25 text-4xl sm:text-5xl lg:text-8xl -mb-10 relative top-0 lg:-left-5 -left-15 z-10">ABOUT</h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#383185] mb-4">ABOUT US</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base z-10">
                        ShreeXpress Courier Service Pvt Ltd was established to provide efficient and prompt mail management services to every segment of society. Our goal is to deliver secure and reliable service for sensitive documents—both for enterprises and the general public. ShreeXpress Courier Service Pvt Ltd was incorporated in November 2011 with just 10 branches, and within just one year, we expanded to over 500 branches across India. Today, we proudly provide services across 4000 PIN codes and handle approximately 1.5 million transactions daily.
                    </p>

                    <div className="space-y-4 flex flex-col z-10">
                        {/* Feature 1 */}
                        <div className="flex items-start gap-4 border-b-2 pb-2 border-[#ACAFC1]">
                            <FaRocket className="text-[#383185] mt-1" size={20} />
                            <div>
                                <h4 className="font-semibold text-gray-800">FAST DELIVERY</h4>
                                <p className="text-gray-600 text-sm">
                                    We provide efficient and prompt mail management services to the
                                    entire society.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-start gap-4 border-b-2 pb-2 border-[#ACAFC1]">
                            <FaShieldAlt className="text-[#383185] mt-1" size={20} />
                            <div>
                                <h4 className="font-semibold text-gray-800">SECURED SERVICE</h4>
                                <p className="text-gray-600 text-sm">
                                    Secure delivery for sensitive documents for enterprise and public.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex items-start gap-4 border-b-2 pb-2 border-[#ACAFC1] ">
                            <FaGlobe className="text-[#383185] mt-1" size={20} />
                            <div>
                                <h4 className="font-semibold text-gray-800">WORLDWIDE SHIPPING</h4>
                                <p className="text-gray-600 text-sm">
                                    Serving across 4000 PINs with 1.5 million daily transactions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex justify-end">
                    <img
                        src={AboutUsImg}
                        alt="Courier Van"
                        className="w-full max-w-md md:max-w-lg object-contain"
                    />
                </div>
            </div>
        </section>
    );
};



export default HomePage