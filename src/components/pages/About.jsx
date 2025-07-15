import React, { useContext, useEffect } from 'react'
import Layout from '../Layout/Layout'
import { FaRocket, FaShieldAlt, FaGlobe } from "react-icons/fa";
import AOS from 'aos';
import ThemeContext from '../../context/Theme/ThemeContext';

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
    const AboutUsImg = './assets/AboutUsImg.png'
    return (
        <section className="py-12 px-4 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-2 sm:p-5">
                {/* Left Content */}
                <div data-aos="fade-right">
                    {/* Add Shadow Text */}
                    <h1 className="font-bold text-wrap text-gray-300 opacity-25 text-4xl sm:text-5xl lg:text-8xl -mb-10 relative top-0 lg:-left-5">ABOUT</h1>
                    <h2 className={`text-3xl md:text-4xl font-bold ${theme === 'light' ? 'text-[#383185]' : 'text-white'} mb-4 z-99`}>ABOUT US</h2>
                    <p className="mb-6 leading-relaxed text-sm md:text-base z-10">
                        ShreeXpress Courier Service Pvt Ltd was established to provide efficient and prompt mail management services to every segment of society. Our goal is to deliver secure and reliable service for sensitive documents—both for enterprises and the general public. ShreeXpress Courier Service Pvt Ltd was incorporated in November 2011 with just 10 branches, and within just one year, we expanded to over 500 branches across India. Today, we proudly provide services across 4000 PIN codes and handle approximately 1.5 million transactions daily.
                    </p>

                    <div className="space-y-4 flex flex-col z-10">
                        {/* Feature 1 */}
                        <div className="flex items-start gap-4 border-b-2 pb-2 border-[#ACAFC1]">
                            <FaRocket className={`${theme === 'light' ? 'text-[#383185]' : 'text-white'} mt-1`} size={20} />
                            <div>
                                <h4 className="font-semibold">FAST DELIVERY</h4>
                                <p className="text-sm">
                                    We provide efficient and prompt mail management services to the
                                    entire society.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-start gap-4 border-b-2 pb-2 border-[#ACAFC1]">
                            <FaShieldAlt className={`${theme === 'light' ? 'text-[#383185]' : 'text-white'} mt-1`} size={20} />
                            <div>
                                <h4 className="font-semibold">SECURED SERVICE</h4>
                                <p className="text-sm">
                                    Secure delivery for sensitive documents for enterprise and public.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex items-start gap-4 border-b-2 pb-2 border-[#ACAFC1] ">
                            <FaGlobe className={`${theme === 'light' ? 'text-[#383185]' : 'text-white'} mt-1`} size={20} />
                            <div>
                                <h4 className="font-semibold">WORLDWIDE SHIPPING</h4>
                                <p className="text-sm">
                                    Serving across 4000 PINs with 1.5 million daily transactions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex lg:justify-end justify-center" data-aos="fade-left">
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

const directors = [
    { name: "DHAMELIYA HEET", phone: 1234567890 },
    { name: "BALAR CRENS", phone: 9825515123 },
    { name: "DHANANI HARSH", phone: 1234567890 }
];

const CompanyDetails = () => {
    return (
        <div className={`max-w-7xl mx-auto gap-10 my-5 items-center py-12 px-4 md:px-10 border-t-1 border-[#393187]`}>
            <h2 className="text-xl font-bold uppercase mb-4">Directors of ShreeXpress Courier Service</h2>
            <ul className="mb-6 space-y-1 0">
                {directors.map((director, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                        <span className="0">➤</span>
                        {director.name}
                    </li>
                ))}
            </ul>

            <p className="mb-12 text-[15px] leading-relaxed 0">
                <span className="font-bold">ShreeXpress Courier Service</span> is managed by some of the efficient and
                dedicated members with over 20 years of experienced personnel from the same industry.{" "}
                <span className="font-bold">ShreeXpress Courier Service</span> was started by 4 directors with the vast
                experience of the Courier Industry and now it is spread across India.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="relative border rounded-lg sm:p-6 p-2 mb-0 shadow-md group overflow-hidden transition-all transform hover:scale-102" data-aos="zoom-in-up" >
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

                <div className="relative border rounded-lg sm:p-6 p-2 shadow-md mb-0 group overflow-hidden transition-all transform hover:scale-102" data-aos="zoom-in-up" >
                    {/* background layer */}
                    <div className="absolute inset-0 w-0 bg-[#09AFF4] rounded-r-lg transition-all duration-[1400ms] ease-out group-hover:w-full z-0" />

                    {/* Content */}
                    <div className="relative z-10 group-hover:text-white m-0 transition-all">
                        <h3 className="text-md font-bold uppercase mb-2">Mission</h3>
                        <p className="text-sm leading-relaxed">
                            At <span className="font-bold">ShreeXpress Courier Service</span> it is our obligation to provide our clients
                            with the most advanced high-quality delivery solutions available in the courier industry today. The
                            operations model represents some of the best value to our clients and customers.
                        </p>
                    </div>
                </div>

                <div className="relative border rounded-lg sm:p-6 p-2 shadow-md mb-0 group overflow-hidden transition-all transform hover:scale-102" data-aos="zoom-in-up" >
                    {/* background layer */}
                    <div className="absolute inset-0 w-0 bg-[#09AFF4] rounded-r-lg transition-all duration-[1400ms] ease-in-out group-hover:w-full z-0" />

                    {/* Content */}
                    <div className="relative z-10 group-hover:text-white m-0 transition-all">
                        <h3 className="text-md font-bold uppercase mb-2">Values</h3>
                        <p className="text-sm leading-relaxed">
                            <span className="font-bold">ShreeXpress Courier Service</span> is a fair employer who employs people from
                            various cultures and regions. Built on the values that define the way they do business,
                            ShreeXpress believes in empowering people to ensure accountability and responsiveness.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
