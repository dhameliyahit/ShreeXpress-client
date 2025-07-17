import React, { useContext } from 'react'
import { IoCall } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import ThemeContext from '../context/Theme/ThemeContext';
import useAuth from '../hooks/useAuth'

export const TopBar = () => {
<<<<<<< HEAD
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const context = useContext(ThemeContext);
    const { toggleTheme } = context;

    const handleLogout = () => {
        localStorage.removeItem("Authorization");
        localStorage.removeItem("user");
        navigate("/login");
    };



=======
    const { theme, toggleTheme } = useContext(ThemeContext);
    
>>>>>>> balar-codebase
    return (
        <div className={`${theme === 'dark' ? 'bg-[#111317] border-b-1 border-[#1F242A]' : 'bg-[#292929]'} text-white flex justify-between flex-wrap items-center text-center shadow-lg`}>
            <div className='h-auto flex items-center justify-center flex-wrap px-1 sm:px-4 py-2.5'>
                <span className='pl-2 text-md'><IoCall /></span> <span className='text-md font-bold mx-1'>CALL US NOW :     </span>  <span className='text-md font-bold text-[#D8262D]'><a href="tel:+919638601192">+91-9638601192</a></span>
            </div>

            <div className="ml-auto mr-1 flex">
                <ThemeToggle onclik={toggleTheme} />
            </div>

            {token && user ? (
                <>
                    <Link to='/' className='mx-2' >Home</Link>
                    <button
                        onClick={() => {
                            if (user.role === "admin") navigate("/admin");
                            else if (user.role === "superadmin") navigate("/superadmin");
                            else if (user.role === "client") navigate("/client");
                        }}
                        className="h-11 px-6 flex items-center text-md cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded transition-all"
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={handleLogout}
                        className="h-11 px-6 ml-4 flex items-center text-md cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded transition-all"
                    >
                        Logout
                    </button>
                </>
            ) : (
                
                <Link
                    to="/login"
                    className="h-11 px-10 flex items-center text-md cursor-pointer bg-[#393187] hover:bg-[#D91F2B] text-white transition-all"
                >
                    LOGIN
                </Link>
            )}

        </div>
    )
}

