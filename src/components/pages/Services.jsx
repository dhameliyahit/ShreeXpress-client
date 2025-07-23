import React, { useContext, useEffect } from "react";
import Layout from "../Layout/Layout";
import { IoMdStopwatch } from "react-icons/io";
import { TbTruckDelivery, TbCoinRupee } from "react-icons/tb";
import AOS from 'aos';
import ThemeContext from "../../context/Theme/ThemeContext";
import '@google/model-viewer';

export default function Services() {
    const { theme } = useContext(ThemeContext);

    // Images
    const WorldMapImg = './assets/world_map.png'

    // AOS initialize
    useEffect(() => {
        AOS.init();
    }, []);

    const deliveryOptions = [
        {
            icon: <TbTruckDelivery />,
            title: 'EXPRESS DELIVERY',
            description:
                'INDIA, UAE, UK, EU and US Next Day Delivery: Fast international air delivery to other countries worldwide.',
        },
        {
            icon: <IoMdStopwatch />,
            title: 'TIMED DELIVERY',
            description:
                'Get your parcel by 9am, 10:30am or 12pm. Timed services shown only if available at your destination.',
        },
        {
            icon: <TbCoinRupee />,
            title: 'ECONOMY DELIVERY',
            description:
                'Affordable shipping: 1–3 day delivery within India by road, or 3–7 days by air for global parcels.',
        },
    ];

    const services = [
        {
            title: '1. COMMITTED TO QUALITY',
            description:
                'We ensure every delivery meets high standards of reliability and precision. Quality service is our promise to every customer at shreeXpress Courier Service.',
        },
        {
            title: '2. CREATE AMAZING EXPERIENCES',
            description:
                'We go beyond just delivery — at shreeXpress Courier Service, we strive to create exceptional service moments that leave a lasting impression.',
        },
        {
            title: '3. PUTTING PEOPLE FIRST',
            description:
                'At shreeXpress Courier Service, we value the people behind every parcel. Our culture is built on teamwork, empathy, and customer care.',
        },
        {
            title: '4. LISTEN TO CUSTOMERS',
            description:
                'Customer feedback is at the core of shreeXpress Courier Service. We’re constantly evolving based on your needs and experiences.',
        },
        {
            title: '5. INFORM. EDUCATE. INNOVATE',
            description:
                'We believe in transparency and innovation. shreeXpress Courier Service keeps customers informed while simplifying complex global logistics.',
        },
        {
            title: '6. WORK HARD, PLAY HARD',
            description:
                'We are passionate about delivery and about life. shreeXpress Courier Service believes in working smart and celebrating every success.',
        },
    ];

    return (
        <Layout>
            <section className="px-4 py-10 sm:px-6 lg:px-12 ">
                <div className="max-w-7xl mx-auto gap-10 items-center md:p-5">
                    <div>
                        {/* Add Shadow Text */}
                        <h1 className="font-bold text-wrap text-gray-300 opacity-25 text-4xl sm:text-5xl lg:text-8xl -mb-10 relative top-0 lg:-left-5 ">SERVICE</h1>
                        <h2 className={`text-3xl md:text-4xl font-bold ${theme === 'light' ? 'text-[#383185]' : 'text-white'} mb-4 z-99`}>OUR SERVICE</h2>

                        {/* Map Image */}
                        <div className="flex justify-center items-center my-10">
                            <img
                                src={WorldMapImg}
                                alt="Courier Van"
                                className="max-w-full lg:max-w-[70%] object-fit mx-auto"
                            />
                        </div>

                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center p-2 my-5 lg:px-20">
                            {/* Left Content */}
                            <div className="text-center text-sm md:text-base mb-6 md:px-7">
                                <div data-aos="fade-right">
                                    <p className="leading-relaxed z-10">
                                        At shreeXpress Courier Service, we specialize in providing affordable, fast, and reliable parcel delivery
                                        across India and globally. Leveraging bulk delivery rates and our vast network, we bring premium service
                                        without premium pricing. Whether you're shipping locally or internationally, we deliver with confidence,
                                        clarity, and care.
                                    </p>
                                    <p>
                                        Compare top carriers under one roof and get the best deal with real-time tracking and delivery confirmation
                                        as standard.
                                    </p>
                                </div>

                                <div className="grid gap-6 mt-10 text-left">
                                    {deliveryOptions.map((option, index) => (
                                        <div key={index} className="flex flex-col sm:flex-row items-start space-x-4">
                                            <div className="text-3xl sm:m-auto mx-5" data-aos="fade-right">{option.icon}</div>
                                            <div className="mx-5">
                                                <h4 className="font-bold text-md mb-1" data-aos="fade-right"> {option.title}</h4>
                                                <p className="text-sm" data-aos="fade-right">{option.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Content */}
                            <model-viewer
                                src="/models/Earth.glb"
                                alt="3D Model"
                                auto-rotate
                                camera-controls
                                ar
                                style={{ width: '100%', height: '100%' }}
                            ></model-viewer>
                        </div>

                        {/* Services */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                            {services.map((service, index) => (
                                <div key={index} className="relative sm:p-6 p-2 mb-0 group overflow-hidden transition-all border-1 border-[#1F242A] px-5 py-5 sm:py-10 sm:px-10 rounded-sm shadow-lg hover:shadow-xl transform hover:scale-102" data-aos="zoom-in-up">

                                    <div className="absolute inset-0 w-0 bg-[#09AFF4] rounded-r-sm transition-all duration-[1400ms] ease-in-out group-hover:w-full z-0" />

                                    <div className="relative z-10 group-hover:text-white m-0 transition-all">
                                        <h5 className="font-bold text-md mb-2">{service.title}</h5>
                                        <div className="p-2.5"></div>
                                        <p className="text-sm ">{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}