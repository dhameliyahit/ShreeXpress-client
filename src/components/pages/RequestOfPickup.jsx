import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useForm } from 'react-hook-form';
import AOS from 'aos'
import axios from 'axios';
import { toast } from "react-toastify";

export default function RequestOfPickup({ isLayout = true }) {
    const ROPImg = './assets/ROP_2.png'; // Adjust the path as necessary
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false)

    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const onSubmit = async (data) => {
        // console.log(data);
        try {
            setLoading(true)
            const res = await axios.post(`${backend_url}/api/v1/lead/pickup`, data)
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

    // AOS intialize
    useEffect(() => {
        AOS.init();
    }, []);

    const content = (
        <section className="max-w-7xl mx-auto mb-5 grid grid-cols-1 md:grid-cols-2 items-center p-2 sm:p-5 py-12 px-4 md:px-10 border-t border-gray-300 w-full ">
            {/* Left Image */}
            <div className="flex justify-center lg:mb-0 transition-all lg:mt-10" data-aos="fade-right">
                <img
                    src={ROPImg}
                    alt="Pickup Delivery Guy"
                    className="w-full max-w-md object-contain transition-all ease-linear"
                />
            </div>

            {/* Right Form */}
            <div className="w-full max-w-xl flex-1 mx-auto lg:mt-10 transition-all" data-aos="fade-left">
                <h2 className="text-2xl font-bold mb-2 text-center lg:text-left">REQUEST FOR PICKUP</h2>
                <p className="text-sm mb-6">
                    SHREEXPRESS COURIER SERVICES currently offers doorstep pickup from over 100 Cities in India & connects to more than 4000 pincodes in India.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium">Full Name *</label>
                        <input
                            type="text"
                            {...register("full_name")}
                            placeholder="Enter your full name"
                            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-3"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone No. *</label>
                        <input
                            type="tel"
                            {...register("phone_number")}
                            placeholder="Enter your phone number"
                            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-3"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">PinCode *</label>
                        <input
                            type="number"
                            {...register("pincode")}
                            placeholder="Enter Pincode"
                            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-3"
                        />
                    </div>

                    <div className='flex justify-between gap-4 flex-col sm:flex-row'>
                        <div className='sm:w-[45%] w-full'>
                            <label className="block text-sm font-medium">Goods Type</label>
                            <input
                                type="text"
                                {...register("goods_type")}
                                placeholder="e.g. Documents, Parcel"
                                className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-3"
                            />
                        </div>

                        <div className='sm:w-[45%] w-full'>
                            <label className="block text-sm font-medium">Appx. Weight</label>
                            <input
                                type="text"
                                {...register("approx_weight")}
                                placeholder="e.g. 2 KG"
                                className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-3"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Address *</label>
                        <textarea
                            {...register("address")}
                            placeholder="Enter full address" autoComplete='address'
                            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-3"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Nearest Branch *</label>
                        <select className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-3" {...register("nearest_branch")}>
                            <option>ABU ROAD</option>
                            <option>Ahmedabad</option>
                            <option>Mumbai</option>
                            {/* Add more options if needed */}
                        </select>
                    </div>

                    <button type="submit" className="bg-purple-700 text-white px-5 cursor-pointer py-3 rounded hover:bg-purple-800 transition">
                        {loading ? "Submitting..." : "SUBMIT REQUEST"}
                    </button>
                </form>
            </div>
        </section>
    );

    return (
        <>
            {isLayout ? <Layout>{content}</Layout> : content}
        </>
    );
}
