import Layout from "../Layout/Layout";

export default function RequestOfPickup({ isLayout = true }) {
    const ROPImg = './assets/ROP.png'; // Adjust the path as necessary

    const content = (
        <section className="flex flex-col lg:flex-row mb-10 items-center pb-6 justify-evenly px-6 border-t border-gray-300 bg-white w-full">
            {/* Left Image */}
            <div className="flex justify-center lg:mb-0 mt-10">
                <img
                    src={ROPImg}
                    alt="Pickup Delivery Guy"
                    className="object-contain border-b-2 max-h-[500px]"
                />
            </div>

            {/* Right Form */}
            <div className="w-full max-w-xl flex-1 lg:mt-10">
                <h2 className="text-2xl font-bold mb-2">REQUEST FOR PICKUP</h2>
                <p className="text-sm text-gray-600 mb-6">
                    SHREEXPRESS COURIER SERVICES currently offers doorstep pickup from over 100 Cities in India & connects to more than 4000 pincodes in India.
                </p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Full Name *</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone No. *</label>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">PinCode *</label>
                        <input
                            type="number"
                            placeholder="Enter Pincode"
                            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-2"
                        />
                    </div>

                    <div className='flex justify-between gap-4 flex-col sm:flex-row'>
                        <div className='sm:w-[45%] w-full'>
                            <label className="block text-sm font-medium">Goods Type</label>
                            <input
                                type="text"
                                placeholder="e.g. Documents, Parcel"
                                className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-2"
                            />
                        </div>

                        <div className='sm:w-[45%] w-full'>
                            <label className="block text-sm font-medium">Appx. Weight</label>
                            <input
                                type="text"
                                placeholder="e.g. 2 KG"
                                className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Address *</label>
                        <textarea
                            placeholder="Enter full address" autoComplete='address'
                            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Nearest Branch *</label>
                        <select className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#383185] rounded px-3 py-2">
                            <option>ABU ROAD</option>
                            <option>Ahmedabad</option>
                            <option>Mumbai</option>
                            {/* Add more options if needed */}
                        </select>
                    </div>

                    <button type="submit" className="bg-purple-700 text-white px-5 py-2 rounded hover:bg-purple-800 transition">
                        SUBMIT REQUEST
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
