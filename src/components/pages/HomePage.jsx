import React from 'react'
import { TopBar } from '../TopBar'
import Layout from '../Layout/Layout';

const HomePage = () => {

    const HomeBG = "/assets/HomeBG.jpg"; //background image path

    return (
        <>
            <TopBar /> {/* This is the Top bar callusnow** component 🔝 */}
            <Layout>
                <div className="relative w-full h-[80vh]">
                    {/* Background Image */}
                    <img
                        src={HomeBG}
                        alt="Home Background"
                        className="w-full h-full object-cover"
                    />

                    {/* Black overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Optional: Content on top */}
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                        <h1 className="text-4xl font-bold"><span className='text-md'>Welcome,</span><br /><span className='text-5xl font-bold'>ShreeXpress</span><br /><span className='text-md'>courier service pvt ltd</span></h1>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default HomePage