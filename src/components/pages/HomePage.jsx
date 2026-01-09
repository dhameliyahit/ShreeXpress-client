import { useContext, useEffect, useState, useRef } from 'react'
import Layout from '../Layout/Layout';
import Typewriter from 'typewriter-effect';
import AOS from 'aos'
import ThemeContext from '../../context/Theme/ThemeContext';
import { useNavigate } from "react-router-dom";
import { Rocket, ShieldCheck, Globe } from 'lucide-react'
import ContactUs from './ContactUs'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const HomePage = () => {
    // AOS initialize
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <Layout>
                <HeroSection /> {/* This is the Hero section */}
                <QuickAccessSection /> {/* This is the Quick Access section */}
                <AboutUs />
                <ContactUs isLayout={false} />
            </Layout>
        </>
    )
}

function HeroSection() {
    const colorImage =
        "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?q=80&w=1118&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


    return (
        <figure className="diff aspect-16/9 h-[80vh]" tabIndex={0}>
            <div className="diff-item-1" role="img" tabIndex={0}>
                <div style={{ backgroundImage: `url(${colorImage})` }} className={`bg-cover bg-center text-primary-content grid place-content-center text-9xl `}>
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
            </div>
            <div className="diff-item-2" role="img">
                <div style={{ backgroundImage: `url(${colorImage})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="grid place-content-center bg-cover bg-center filter grayscale  text-9xl font-black">
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
            </div>
            <div className="diff-resizer"></div>
        </figure>
    );
}

const QuickAccessSection = () => {
    const [trackingInput, setTrackingInput] = useState("");
    const [searchText, setSearchText] = useState("");
    const [filteredBranches, setFilteredBranches] = useState([]);
    const [loadingTrack, setLoadingTrack] = useState(false);
    const [loadingBranches, setLoadingBranches] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const searchTimer = useRef(null);

    const handleTrackingSubmit = (e) => {
        e.preventDefault();

        if (!trackingInput.trim()) {
            alert("Please enter a consignment number");
            return;
        }

        setLoadingTrack(true);
        navigate(`/track/${trackingInput.trim()}`);
        setLoadingTrack(false);
    };

    const searchBranches = async (query) => {
        if (!query.trim()) {
            setFilteredBranches([]);
            setIsDropdownOpen(false);
            return;
        }

        try {
            setLoadingBranches(true);

            const res = await axios.get(`${API_BASE}/api/branches/all/${encodeURIComponent(query)}`);

            const data = res.data || [];
            setFilteredBranches(data);
            setIsDropdownOpen(data.length > 0);
        } catch (err) {
            console.error("Branch search failed:", err);
            setFilteredBranches([]);
            setIsDropdownOpen(false);
        } finally {
            setLoadingBranches(false);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);

        if (searchTimer.current) clearTimeout(searchTimer.current);

        searchTimer.current = setTimeout(() => {
            searchBranches(value);
        }, 300);
    };

    const handleBranchSelect = (branch) => {
        setSearchText(`${branch.branch_name} - ${branch.pincode}`);
        setFilteredBranches([]);
        setIsDropdownOpen(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        searchBranches(searchText);
    };

    useEffect(() => {
        return () => {
            if (searchTimer.current) clearTimeout(searchTimer.current);
        };
    }, []);

    return (
        <section className="backdrop-blur-md py-3 px-1 sm:px-4 md:px-10">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-2 md:p-10">
                <form
                    onSubmit={handleTrackingSubmit}
                    className="shadow-2xl p-5 border border-[#383185]"
                >
                    <h2 className="font-semibold mb-2">Track Your Consignment</h2>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={trackingInput}
                            onChange={(e) => setTrackingInput(e.target.value)}
                            placeholder="Enter Consignment No."
                            className="w-full border px-4 py-3 rounded"
                        />

                        <button
                            type="submit"
                            disabled={loadingTrack}
                            className="bg-[#383185] text-white px-4 rounded"
                        >
                            {loadingTrack ? "TRACKING..." : "TRACK"}
                        </button>
                    </div>
                </form>

                <form onSubmit={handleSearchSubmit} className="relative shadow-2xl p-5 border border-[#383185]">
                    <h2 className="font-semibold mb-2">Find Our Outlet</h2>

                    <div className="flex gap-2">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchText}
                                onChange={handleSearchChange}
                                placeholder="Search Branch / City / Pincode"
                                className="w-full border px-4 py-3 rounded"
                                onFocus={() => searchText && setIsDropdownOpen(true)}
                            />

                            {isDropdownOpen && filteredBranches.length > 0 && (
                                <ul className="absolute z-50 bg-white w-full border rounded shadow max-h-48 overflow-y-auto">
                                    {filteredBranches.map((branch) => (
                                        <li
                                            key={branch._id}
                                            onClick={() => handleBranchSelect(branch)}
                                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <div className="font-semibold">
                                                {branch.branch_name}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {branch.address} - {branch.pincode}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loadingBranches}
                            className="bg-[#383185] text-white px-4 rounded whitespace-nowrap"
                        >
                            {loadingBranches ? "SEARCHING..." : "SEARCH"}
                        </button>
                    </div>
                </form>
            </div >
        </section >
    );
};

const AboutUs = () => {
    const { theme } = useContext(ThemeContext);
    const AboutUsImg = "./assets/AboutUsImg.png";

    const iconColor = theme === "light" ? "#383185" : "#ffffff";

    return (
        <section className="py-12 px-4 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-2 sm:p-5">
                {/* Left Content */}
                <div data-aos="fade-right">
                    {/* Shadow Text */}
                    <h1 className="font-bold text-gray-300 opacity-20 text-4xl sm:text-5xl lg:text-8xl -mb-10 relative lg:-left-5">
                        ABOUT
                    </h1>

                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === "light" ? "text-[#383185]" : "text-white"}`}>
                        ABOUT US
                    </h2>

                    <p className="mb-6 leading-relaxed text-sm md:text-base">
                        Courier Service Pvt Ltd was established to provide efficient and prompt
                        mail management services to every segment of society. Our goal is to
                        deliver secure and reliable service for sensitive documents—both for
                        enterprises and the general public. Incorporated in November 2011 with
                        just 10 branches, we now operate over 500 branches across India, serving
                        4000+ PIN codes and handling nearly 1.5 million transactions daily.
                    </p>

                    {/* Features */}
                    <div className="space-y-4 flex flex-col">
                        {/* Feature 1 */}
                        <div className="flex items-start gap-4 border-b pb-3 border-[#1F242A]">
                            <Rocket size={22} color={iconColor} className="mt-1" />
                            <div>
                                <h4 className="font-semibold">FAST DELIVERY</h4>
                                <p className="text-sm">
                                    Efficient and prompt mail management services nationwide.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-start gap-4 border-b pb-3 border-[#1F242A]">
                            <ShieldCheck size={22} color={iconColor} className="mt-1" />
                            <div>
                                <h4 className="font-semibold">SECURED SERVICE</h4>
                                <p className="text-sm">
                                    Safe and reliable delivery for sensitive documents.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex items-start gap-4 border-b pb-3 border-[#1F242A]">
                            <Globe size={22} color={iconColor} className="mt-1" />
                            <div>
                                <h4 className="font-semibold">WIDE NETWORK</h4>
                                <p className="text-sm">
                                    Serving 4000+ PIN codes with nationwide coverage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex lg:justify-end justify-center" data-aos="fade-left">
                    <img
                        src={AboutUsImg}
                        alt="Courier Service"
                        className="w-full max-w-md md:max-w-lg object-contain"
                    />
                </div>

            </div>
        </section>
    );
};



export default HomePage