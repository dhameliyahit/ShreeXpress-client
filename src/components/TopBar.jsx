import React from 'react'
import { IoCall } from "react-icons/io5";

export const TopBar = () => { 
    return (
        <div className='bg-[#292929] text-white block md:flex justify-between items-center shadow-lg overflow-hidden'>
            <div className='h-10 flex items-center justify-between px-4'>
                <span className='pl-2 text-md'><IoCall /></span> <span className='text-md font-bold mx-1'>CALL US NOW :     </span>  <span className='text-md font-bold text-[#D8262D]'><a href="tel:+919638601192">+91-9638601192</a></span>
            </div>
            <div>
                <button className='h-10 px-10 text-md cursor-pointer bg-[#393187] hover:bg-[#D91F2B] transition duration-[0.5s]'>LOGIN</button>
            </div>
        </div>
    )
}

//hegith h-10 mean's 40px from both div

//top bar done

//changes
// changes
// login button navigation add using react router🔥

