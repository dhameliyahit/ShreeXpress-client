import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import AOS from 'aos'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ContactUs() {
    // AOS intialize
    useEffect(() => {
        AOS.init()
    }, []);

    return (
        <Layout>
            <ContactForm />
            <ContactMap />
        </Layout>
    )
}

const ContactForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const ContactUsImg = '/assets/contactus.png';

    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const onSubmit = async (data) => {
        // console.log(data);
        try {
            setLoading(true)
            const res = await axios.post(`${backend_url}/api/v1/lead/contact`, data)
            console.log("Server Response:", res.data);
            setLoading(false)
            reset();
        } catch (error) {
            toast.error(error.message || "Something went wrong", {
                style: {
                    fontWeight: "bold",
                    fontSize: "17px",
                    color: "black"
                }
            }); // Show error in toasts
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <section className="bg-white py-12 px-4 md:px-10 border-t-2 border-[#393187] ">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10 items-center p-2 sm:p-5">

                {/* Left Section */}
                <div className="h-full flex flex-col justify-evenly transition-all">
                    <div>
                        <h1 className="font-bold text-wrap text-gray-300 opacity-25 text-4xl sm:text-5xl lg:text-8xl -mb-10 relative top-0 lg:-left-5 -left-15">CONTACT</h1>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#383185] mb-4 z-99">CONTACT US</h2>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src={ContactUsImg} alt="" className='max-w-full sm:max-w-[400px]' />
                    </div>
                    <ul className='flex-1 flex flex-col justify-center gap-1'>
                        <li className='flex justify-around flex-wrap sm:flex-nowrap text-center sm:text-left' data-aos="fade-right"> <span className='w-full text-center'>Phone numbers:</span> <p className="text-gray-500 w-full wrap-anywhere"> +91-9825515123 </p> </li>

                        <li className='flex justify-around flex-wrap sm:flex-nowrap text-center sm:text-left' data-aos="fade-right"> <span className='w-full text-center'>Email address:</span> <p className="text-gray-500 w-full wrap-anywhere"> info@shreexpresscourier.co.in <br /> service@shreexpresscourier.co.in </p> </li>
                    </ul>
                </div>

                {/* Right Form */}
                <div className="w-full max-w-xl transition-all" data-aos="fade-left">
                    <form className="space-y-4 mt-10" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-sm font-medium">Full Name *</label>
                            <input
                                type="text"
                                {...register("full_name")}
                                placeholder="Enter your full name"
                                className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Phone No. *</label>
                            <input
                                type="tel"
                                {...register("phone_number")}
                                placeholder="Enter your phone number"
                                className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Email *</label>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="Enter your Email"
                                className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Subject *</label>
                            <input
                                type="text"
                                {...register("subject")}
                                placeholder="Enter your Subject"
                                className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Message *</label>
                            <textarea
                                {...register("message")}
                                placeholder="Enter your Subject"
                                className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#383185] rounded px-3 py-3"
                            />
                        </div>

                        <button type="submit" className="bg-purple-700 text-white cursor-pointer px-5 py-3 rounded hover:bg-purple-800 transition">
                            {loading ? 'Submitting...' : 'SUBMIT'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

const ContactMap = () => {
    return (
        <section>
            {/* Google Map */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7438.677534689519!2d72.87923741445087!3d21.2184109731211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f6ef999fe8b%3A0x2b1e12024710c65b!2sChikuwadi%2C%20Nana%20Varachha%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1752068677430!5m2!1sen!2sin" className='w-full' height="500" allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </section>
    )
}