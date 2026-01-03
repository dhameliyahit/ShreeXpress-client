import { useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useForm } from 'react-hook-form'
import AOS from 'aos'
import ThemeContext from '../../context/Theme/ThemeContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function FranchiseeInquiry() {
    return (
        <Layout>
            <IntroSection />
            <FranchiseeForm />
        </Layout>
    )
}

const IntroSection = () => {
    const { theme } = useContext(ThemeContext)
    const FranchiseImg = "/assets/franchise.jpg";

    // AOS initialize
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <section className="py-12 px-4 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10 items-center p-2 sm:p-5">
                {/* Left Section */}
                <div className="h-full flex flex-col justify-evenly transition-all" data-aos="fade-right">
                    <div>
                        <h1 className="font-bold text-wrap text-gray-300 opacity-25 text-4xl sm:text-5xl lg:text-8xl -mb-10 relative top-0 lg:-left-5 ">FRANCHISE</h1>
                        <h2 className={`text-3xl md:text-4xl font-bold ${theme === 'light' ? 'text-[#383185]' : 'text-white'} mb-4 z-99`}>FRANCHISE INQUIRE</h2>
                    </div>
                    <div className="space-y-3 ">
                        <p>
                            is a well-known and established name in Domestic, International Courier and Cargo
                            industry worldwide. With minimal branding and advertising effort, the company today has
                            become a generic brand.
                        </p>
                        <p>
                            The company operates from its head office and is steadily expanding its own network to
                            meet customer requirements over time.
                        </p>
                        <p>
                            Each branch is headed by qualified personnel and is equipped with modern technology to
                            ensure smooth system functioning and efficient processes.
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className='flex justify-center items-center h-full' data-aos="fade-left">
                    <img src={FranchiseImg} alt="" className='max-w-full max-h-full' />
                </div>
            </div>
        </section>
    )
}

const FranchiseeForm = () => {
    const { handleSubmit, register, reset } = useForm();
    const { theme } = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await axios.post(`${API_URL}/api/franchise/new/request`, data);
            setLoading(false);
            toast.success("Franchise Request Submitted");
            reset();
            // console.log(res.data);
        } catch (error) {
            toast.error(error.response?.data?.error || "Submission failed");
            console.error(error.message);
        }
    };

    return (
        <div className="max-w-7xl mx-auto items-center p-2 sm:p-5 transition-all">
            <form className="space-y-4 mt-10 px-2 py-2" onSubmit={handleSubmit(onSubmit)}>
                <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-sm font-medium">First Name *</label>
                        <input
                            type="text"
                            {...register("first_name")}
                            placeholder="First name"
                            className={`w-full border border-gray-400 ${theme === 'dark' ? 'bg-[#1B273B] text-white' : 'bg-white/90 text-gray-800'} focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Last Name *</label>
                        <input
                            type="text"
                            {...register("last_name")}
                            placeholder="Last name"
                            className={`w-full border border-gray-400 ${theme === 'dark' ? 'bg-[#1B273B] text-white' : 'bg-white/90 text-gray-800'} focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3`}
                        />
                    </div>
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-sm font-medium">Email *</label>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="Email"
                            className={`w-full border border-gray-400 ${theme === 'dark' ? 'bg-[#1B273B] text-white' : 'bg-white/90 text-gray-800'} focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone *</label>
                        <input
                            type="text"
                            {...register("phone")}
                            placeholder="Phone no."
                            className={`w-full border border-gray-400 ${theme === 'dark' ? 'bg-[#1B273B] text-white' : 'bg-white/90 text-gray-800'} focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3`}
                        />
                    </div>
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-sm font-medium">Franchisee Location *</label>
                        <input
                            type="text"
                            {...register("location")}
                            placeholder="Franchise Location"
                            className={`w-full border border-gray-400 ${theme === 'dark' ? 'bg-[#1B273B] text-white' : 'bg-white/90 text-gray-800'} focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Pincode *</label>
                        <input
                            type="text"
                            {...register("pincode")}
                            placeholder="Pincode"
                            className={`w-full border border-gray-400 ${theme === 'dark' ? 'bg-[#1B273B] text-white' : 'bg-white/90 text-gray-800'} focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3`}
                        />
                    </div>
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-sm font-medium">Current Business / Courier</label>
                        <input
                            type="text"
                            {...register("current_business")}
                            placeholder="Current Business / Courier"
                            className={`w-full border border-gray-400 ${theme === 'dark' ? 'bg-[#1B273B] text-white' : 'bg-white/90 text-gray-800'} focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Experience in Courier
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                            {/* Years */}
                            <select
                                {...register("experience_years")}
                                className={`w-full border border-gray-400 ${theme === 'dark'
                                    ? 'bg-[#1B273B] text-white'
                                    : 'bg-white/90 text-gray-800'
                                    } focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3`}
                            >
                                <option value="0">0 Years</option>
                                <option value="1">1 Year</option>
                                <option value="2">2 Years</option>
                                <option value="3">3 Years</option>
                                <option value="4">4 Years</option>
                                <option value="5">5+ Years</option>
                            </select>

                            {/* Months */}
                            <select
                                {...register("experience_months")}
                                className={`w-full border border-gray-400 ${theme === 'dark'
                                    ? 'bg-[#1B273B] text-white'
                                    : 'bg-white/90 text-gray-800'
                                    } focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3`}
                            >
                                <option value="0">0 Months</option>
                                <option value="1">1 Month</option>
                                <option value="2">2 Months</option>
                                <option value="3">3 Months</option>
                                <option value="4">4 Months</option>
                                <option value="5">5 Months</option>
                                <option value="6">6 Months</option>
                                <option value="9">9 Months</option>
                                <option value="11">11 Months</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">Message *</label>
                    <textarea
                        {...register("message")}
                        placeholder="Enter your Subject"
                        className={`w-full border border-gray-400 ${theme === 'dark' ? 'bg-[#1B273B] text-white' : 'bg-white/90 text-gray-800'} focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3`}
                    />
                </div>

                <button type="submit" className="bg-purple-700 text-white cursor-pointer px-5 py-3 rounded hover:bg-purple-800 transition">
                    {loading ? 'Submitting...' : 'SUBMIT'}
                </button>
            </form >
        </div >
    )
}