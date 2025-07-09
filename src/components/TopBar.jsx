import React from 'react'
import { IoCall } from "react-icons/io5";
import { Link } from 'react-router-dom';

export const TopBar = () => {
    return (
        <div className='bg-[#292929] text-white flex justify-between flex-wrap items-center text-center shadow-lg '>
            <div className='h-auto flex items-center justify-center flex-wrap px-1 sm:px-4 py-2.5'>
                <span className='pl-2 text-md'><IoCall /></span> <span className='text-md font-bold mx-1'>CALL US NOW :     </span>  <span className='text-md font-bold text-[#D8262D]'><a href="tel:+919638601192">+91-9638601192</a></span>
            </div>
            <Link to='/login' className='h-11 px-10 flex items-center text-md cursor-pointer bg-[#393187] hover:bg-[#D91F2B] transition-all'>LOGIN</Link>
        </div>
    )
}

//hegith h-10 mean's 40px from both div

//top bar done

//changes
// changes
// login button navigation add using react router🔥

