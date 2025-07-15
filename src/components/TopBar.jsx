import React, { useContext } from 'react'
import { IoCall } from "react-icons/io5";
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import ThemeContext from '../context/Theme/ThemeContext';

export const TopBar = () => {
    const context = useContext(ThemeContext);
    const { toggleTheme } = context;
    
    return (
        <div className='bg-[#292929] text-white flex justify-between flex-wrap items-center text-center shadow-lg '>
            <div className='h-auto flex items-center justify-center flex-wrap px-1 sm:px-4 py-2.5'>
                <span className='pl-2 text-md'><IoCall /></span> <span className='text-md font-bold mx-1'>CALL US NOW :     </span>  <span className='text-md font-bold text-[#D8262D]'><a href="tel:+919638601192">+91-9638601192</a></span>
            </div>

            <div className="ml-auto mr-1 flex">
                <ThemeToggle onclik={toggleTheme} />
            </div>
            <Link to='/login' className='h-11 px-10 flex items-center text-md cursor-pointer bg-[#393187] hover:bg-[#D91F2B] transition-all'>LOGIN</Link>
        </div>
    )
}

