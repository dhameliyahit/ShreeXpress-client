import React, { useContext, useEffect } from 'react'
import Layout from '../Layout/Layout'
// import { FaRocket, FaShieldAlt, FaGlobe } from "react-icons/fa";
import AOS from 'aos';
import ThemeContext from '../../context/Theme/ThemeContext';
import { Phone, Mail, ChevronDown, Rocket, ShieldCheck, Globe } from "lucide-react";

export default function About() {
    // AOS initialize
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <Layout>
                <AboutUs />
                <CompanyDetails />
            </Layout>
        </>
    )
}

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

const directors = [
    { name: "BALAR CRENS", phone: 9825515123, email: "balarcrens@gmail.com" },
    { name: "DHAMELIYA HEET", phone: 9638601192, email: "heetdhameliya@gmail.com" },
    { name: "CHAUHAN JAYDIP", phone: 9624983883, email: "jatinchauhan2004@gmail.com" }
];

const CompanyDetails = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`max-w-7xl mx-auto gap-10 my-5 items-center py-12 px-4 md:px-10 border-t-1 ${theme === 'dark' ? 'border-[#1F242A]' : 'border-[#393187]'}`}>
            <h2 className="text-xl font-bold uppercase mb-4">Directors of  Courier Service</h2>
            <ul className="mb-6 space-y-4">
                {directors.map((director, idx) => (
                    <details
                        key={idx}
                        className="group rounded-xl border border-gray-300 p-4 transition-all duration-300 hover:shadow-md bg-white"
                    >
                        <summary className="cursor-pointer text-md sm:text-lg font-semibold flex items-center justify-between text-gray-800">
                            {director.name}
                            <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:rotate-180" />
                        </summary>

                        <div className="mt-4 space-y-3 text-sm">
                            {/* Phone */}
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md bg-indigo-100 text-indigo-600">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <a
                                    href={`tel:+91${director.phone}`}
                                    className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                                >
                                    +91 {director.phone}
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md bg-emerald-100 text-emerald-600">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <a
                                    href={`mailto:${director.email}`}
                                    className="font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                                >
                                    {director.email}
                                </a>
                            </div>
                        </div>
                    </details>
                ))}
            </ul>


            <p className="mb-12 text-[15px] leading-relaxed 0">
                <span className="font-bold"> Courier Service</span> is managed by some of the efficient and
                dedicated members with over 20 years of experienced personnel from the same industry.{" "}
                <span className="font-bold"> Courier Service</span> was started by {directors.length} directors with the vast
                experience of the Courier Industry and now it is spread across India.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="relative border-1 border-[#1F242A] rounded-lg sm:p-6 p-2 mb-0 shadow-md group overflow-hidden transition-all transform hover:scale-102" data-aos="zoom-in-up" >
                    {/* background layer */}
                    <div className="absolute inset-0 w-0 bg-[#09AFF4] rounded-r-lg transition-all duration-[1400ms] ease-out group-hover:w-full z-0" />

                    {/* Content */}
                    <div className="relative z-10 group-hover:text-white m-0 transition-all">
                        <h3 className="text-md font-bold uppercase mb-2">Vision</h3>
                        <p className="text-sm leading-relaxed">
                            We will achieve leadership in the Indian courier industry by providing integrated logistics
                            solutions to the customers' distribution needs through our domain expertise by being dependable,
                            responsive, and a cohesive organization.
                        </p>
                    </div>
                </div>

                <div className="relative border-1 border-[#1F242A] rounded-lg sm:p-6 p-2 shadow-md mb-0 group overflow-hidden transition-all transform hover:scale-102" data-aos="zoom-in-up" >
                    {/* background layer */}
                    <div className="absolute inset-0 w-0 bg-[#09AFF4] rounded-r-lg transition-all duration-[1400ms] ease-out group-hover:w-full z-0" />

                    {/* Content */}
                    <div className="relative z-10 group-hover:text-white m-0 transition-all">
                        <h3 className="text-md font-bold uppercase mb-2">Mission</h3>
                        <p className="text-sm leading-relaxed">
                            At <span className="font-bold"> Courier Service</span> it is our obligation to provide our clients
                            with the most advanced high-quality delivery solutions available in the courier industry today. The
                            operations model represents some of the best value to our clients and customers.
                        </p>
                    </div>
                </div>

                <div className="relative border-1 border-[#1F242A] rounded-lg sm:p-6 p-2 shadow-md mb-0 group overflow-hidden transition-all transform hover:scale-102" data-aos="zoom-in-up" >
                    {/* background layer */}
                    <div className="absolute inset-0 w-0 bg-[#09AFF4] rounded-r-lg transition-all duration-[1400ms] ease-in-out group-hover:w-full z-0" />

                    {/* Content */}
                    <div className="relative z-10 group-hover:text-white m-0 transition-all">
                        <h3 className="text-md font-bold uppercase mb-2">Values</h3>
                        <p className="text-sm leading-relaxed">
                            <span className="font-bold"> Courier Service</span> is a fair employer who employs people from
                            various cultures and regions. Built on the values that define the way they do business,
                            believes in empowering people to ensure accountability and responsiveness.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};