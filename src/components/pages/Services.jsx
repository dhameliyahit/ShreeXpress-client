import React from "react";
import Layout from "../Layout/Layout";

export default function Services() {
    const services = [
        {
            title: "Door-to-Door Delivery",
            description:
                "We pick up the parcel from your doorstep and deliver it directly to the recipient.",
            image: "https://cdn-icons-png.flaticon.com/512/1048/1048949.png",
        },
        {
            title: "Express Shipping",
            description:
                "Fast and reliable courier delivery within 24-48 hours across major cities.",
            image: "https://cdn-icons-png.flaticon.com/512/2920/2920093.png",
        },
        {
            title: "Parcel Tracking",
            description:
                "Track your parcel in real-time with our online tracking system.",
            image: "https://cdn-icons-png.flaticon.com/512/4471/4471441.png",
        },
        {
            title: "International Courier",
            description:
                "Send parcels globally with trusted international partners and quick delivery.",
            image: "https://cdn-icons-png.flaticon.com/512/2284/2284693.png",
        },
    ];

    return (
        <Layout>
            <section className="px-4 py-10 sm:px-6 lg:px-12">
                <h2 className="text-3xl font-bold text-center text-[#E31E25] mb-10">
                    Our Services
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition duration-300"
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                className="mx-auto w-20 h-20 object-contain mb-4"
                            />
                            <h3 className="text-xl font-semibold text-[#383185] mb-2">
                                {service.title}
                            </h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    );
}