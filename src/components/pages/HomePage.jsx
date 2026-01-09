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
    const [branches, setBranches] = useState([]);
    const [trackingInput, setTrackingInput] = useState("");
    const [searchText, setSearchText] = useState("");
    const [filteredBranches, setFilteredBranches] = useState([]);
    const [loadingTrack, setLoadingTrack] = useState(false);
    const [loadingBranches, setLoadingBranches] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Fetch branches on component mount
    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        try {
            setLoadingBranches(true);
            const response = await axios.get(`${API_BASE}/api/branches`);
            const branchesData = response.data?.data || response.data || [];
            setBranches(branchesData);
        } catch (error) {
            console.error('Error fetching branches:', error);
            setBranches([]);
        } finally {
            setLoadingBranches(false);
        }
    };

    const handleTrackingSubmit = async (e) => {
        e.preventDefault();
        
        if (!trackingInput.trim()) {
            alert("Please enter a consignment number");
            return;
        }

        setLoadingTrack(true);
        try {
            // Navigate to tracking page with the tracking number
            navigate(`/track/${trackingInput.trim()}`);
        } catch (error) {
            console.log(error)
            alert("Error navigating to tracking page");
        } finally {
            setLoadingTrack(false);
        }
    };

    const searchTimer = useRef(null);

    const searchBranches = async (q) => {
        if (!q || !q.trim()) return setFilteredBranches([]);
        setLoadingBranches(true);
        try {
            // Try dedicated search endpoint first
            let res;
            try {
                res = await axios.get(`${API_BASE}/api/branches/search?query=${encodeURIComponent(q)}`);
            } catch (err) {
                console.log(err)
                // fallback to common endpoint with query param
                res = await axios.get(`${API_BASE}/api/branches?search=${encodeURIComponent(q)}`);
            }

            const data = res.data?.data || res.data || [];
            if (Array.isArray(data) && data.length > 0) {
                setFilteredBranches(data);
                setIsDropdownOpen(true);
                return;
            }
        } catch (err) {
            // ignore and fall back to client-side filter
            console.log(err)
            console.debug('Search API not available or failed, falling back to client filter');
        } finally {
            setLoadingBranches(false);
        }

        // client-side fallback
        const ql = q.toLowerCase();
        const filtered = branches.filter((branch) =>
            (branch.name || '').toLowerCase().includes(ql) ||
            (branch.city || '').toLowerCase().includes(ql) ||
            (branch.state || '').toLowerCase().includes(ql) ||
            (branch.pincode || '').toString().includes(ql)
        );
        setFilteredBranches(filtered);
        setIsDropdownOpen(filtered.length > 0);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);

        // debounce API calls
        if (searchTimer.current) clearTimeout(searchTimer.current);
        searchTimer.current = setTimeout(() => {
            searchBranches(value);
        }, 300);
    };

    const handleBranchSelect = (branch) => {
        setSearchText(`${branch.name} - ${branch.city}`);
        setFilteredBranches([]);
        setIsDropdownOpen(false);
    };

    return (
        <section className="backdrop-blur-md py-3 px-1 sm:px-4 md:px-10 ">
            <div className="max-w-5xl mx-auto grid grid-cols-1 text-lg md:grid-cols-2 gap-6 p-2 md:p-10">
                {/* Track Consignment */}
                <form onSubmit={handleTrackingSubmit} className='shadow-2xl p-5 border border-[#383185] transition-all' data-aos="zoom-in-right">
                    <div className='mb-2 flex items-center'>
                        <div className='relative left-0 w-8 h-2 mx-2 bg-[#383185]'></div>
                        <h2 className="font-semibold">Track Your Consignment</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            placeholder="Enter Consignment No."
                            value={trackingInput}
                            onChange={(e) => setTrackingInput(e.target.value)}
                            className="w-full focus:outline-none focus:ring-1 focus:ring-[#383185] border border-gray-300 bg-white text-black placeholder-gray-500 rounded px-4 py-3 text-sm"
                        />
                        <button 
                            type="submit"
                            disabled={loadingTrack}
                            className="bg-[#383185] cursor-pointer text-white px-4 py-2 rounded transition-all duration-700 hover:bg-[#C52024] disabled:opacity-50"
                        >
                            {loadingTrack ? "TRACKING..." : "TRACK"}
                        </button>
                    </div>
                    <p className="text-sm text-gray-400 font-semibold mt-1">
                        Enter your shipment tracking number (e.g. 123456789123)
                    </p>
                </form>

                {/* Find Outlet */}
                <div className="relative shadow-2xl p-5 border border-[#383185] transition-all" data-aos="zoom-in-left">
                    <div className='mb-2 flex items-center'>
                        <div className='relative left-0 w-8 h-2 mx-2 bg-[#383185]'></div>
                        <h2 className="font-semibold">Find Our Outlet</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="w-full relative">
                            <input
                                type="text"
                                placeholder={loadingBranches ? "Loading branches..." : "Search Branch / City / Pincode"}
                                className="w-full focus:outline-none focus:ring-1 focus:ring-[#383185] border border-gray-300 bg-white text-black placeholder-gray-500 rounded px-4 py-3 text-sm"
                                value={searchText}
                                onChange={handleSearchChange}
                                onFocus={() => searchText.trim() && setIsDropdownOpen(true)}
                                disabled={loadingBranches}
                            />
                            
                            {/* Dropdown Suggestions */}
                            {isDropdownOpen && filteredBranches.length > 0 && (
                                <ul className="absolute z-50 bg-white border border-gray-300 w-full mt-1 rounded shadow-lg max-h-48 overflow-y-auto text-sm">
                                    {filteredBranches.map((branch, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition"
                                            onClick={() => handleBranchSelect(branch)}
                                        >
                                            <div className="font-semibold text-gray-800">{branch.name}</div>
                                            <div className="text-xs text-gray-600">
                                                {branch.city}, {branch.state} - {branch.pincode}
                                            </div>
                                            {branch.phone && (
                                                <div className="text-xs text-gray-500 mt-1">{branch.phone}</div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button className="bg-[#383185] cursor-pointer text-white px-4 py-2 rounded transition-all duration-700 hover:bg-[#C52024] whitespace-nowrap">
                            SEARCH
                        </button>
                    </div>
                    <p className="text-sm text-gray-400 font-semibold mt-1">
                        Type branch name, city, or pincode to find outlets
                    </p>
                </div>
            </div>
        </section>
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