import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { FaRocket, FaShieldAlt, FaGlobe } from "react-icons/fa";
import AOS from 'aos';

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
    const AboutUsImg = './assets/AboutUsImg.png'
    return (
        <section className="bg-white py-12 px-4 md:px-10 border-t-2 border-[#393187] ">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-5">
                {/* Left Content */}
                <div data-aos="fade-right">
                    {/* Add Shadow Text */}
                    <h1 className="font-bold text-wrap text-gray-300 opacity-25 text-4xl sm:text-5xl lg:text-8xl -mb-10 relative top-0 lg:-left-5 -left-15">ABOUT</h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#383185] mb-4 z-99">ABOUT US</h2>
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
    "DHAMELIYA HEET",
    "BALAR CRENS",
    "DHANANI HARSH",
];

const CompanyDetails = () => {
    return (
        <div className="bg-white max-w-7xl mx-auto gap-10 my-5 items-center p-5 border-t-1 border-[#393187]">
            <h2 className="text-xl font-bold uppercase mb-4">Directors of ShreeXpress Courier Service</h2>
            <ul className="mb-6 space-y-1 text-gray-500">
                {directors.map((name, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                        <span className="text-gray-500">➤</span>
                        {name}
                    </li>
                ))}
            </ul>

            <p className="mb-12 text-[15px] leading-relaxed text-gray-500">
                <span className="font-bold">ShreeXpress Courier Service</span> is managed by some of the efficient and
                dedicated members with over 20 years of experienced personnel from the same industry.{" "}
                <span className="font-bold">ShreeXpress Courier Service</span> was started by 4 directors with the vast
                experience of the Courier Industry and now it is spread across India.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-center text-gray-500">
                <div className="border p-6 shadow-md hover:bg-[#0B6BD3] hover:text-[white] transition-all" data-aos="zoom-in-up">
                    <h3 className="text-md font-bold uppercase mb-2">Vision</h3>
                    <p className="text-sm leading-relaxed">
                        We will achieve leadership in the Indian courier industry by providing integrated logistics
                        solutions to the customers' distribution needs through our domain expertise by being dependable,
                        responsive, and a cohesive organization.
                    </p>
                </div>

                <div className="border p-6 shadow-md hover:bg-[#0B6BD3] hover:text-[white] transition-all" data-aos="zoom-in-up">
                    <h3 className="text-md font-bold uppercase mb-2 ">Mission</h3>
                    <p className="text-sm leading-relaxed">
                        At <span className="font-bold">ShreeXpress Courier Service</span> it is our obligation to provide our clients
                        with the most advanced high-quality delivery solutions available in the courier industry today. The
                        operations model represents some of the best value to our clients and customers.
                    </p>
                </div>

                <div className="border p-6 shadow-md hover:bg-[#0B6BD3] hover:text-[white] transition-all" data-aos="zoom-in-up">
                    <h3 className="text-md font-bold uppercase mb-2">Values</h3>
                    <p className="text-sm leading-relaxed">
                        <span className="font-bold">ShreeXpress Courier Service</span> is a fair employer who employs people from
                        various cultures and regions. Built on the values that define the way they do business,
                        ShreeXpress believes in empowering people to ensure accountability and responsiveness.
                    </p>
                </div>
            </div>
        </div>
    );
};
