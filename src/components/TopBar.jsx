import React, { useContext } from 'react';
import { IoCall } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import ThemeContext from '../context/Theme/ThemeContext';
import useAuth from '../hooks/useAuth';

export const TopBar = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleLogout = () => {
        localStorage.removeItem("Authorization");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className={`${theme === 'dark' ? 'bg-[#111317] border-b border-[#1F242A]' : 'bg-[#292929]'} text-white flex justify-between items-center flex-wrap shadow-lg py-2 px-4`}>
            <div className="flex items-center gap-2">
                <IoCall className="text-lg" />
                <span className="text-sm font-bold">CALL US NOW :</span>
                <a href="tel:+919638601192" className="text-sm font-bold text-[#D8262D]">+91-9638601192</a>
            </div>

            <div className="flex items-center gap-3 ml-auto">
                <ThemeToggle onClick={toggleTheme} />

                {token && user ? (
                    <>
                        <Link to='/' className='text-sm hover:underline'>Home</Link>

                        <button
                            onClick={() => {
                                if (user.role === "admin") navigate("/admin");
                                else if (user.role === "superadmin") navigate("/superadmin");
                                else if (user.role === "client") navigate("/client");
                            }}
                            className="h-10 px-5 bg-green-600 hover:bg-green-700 rounded text-sm"
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={handleLogout}
                            className="h-10 px-5 bg-red-600 hover:bg-red-700 rounded text-sm ml-2"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="h-10 px-6 bg-[#393187] hover:bg-[#D91F2B] rounded text-sm"
                    >
                        LOGIN
                    </Link>
                )}
            </div>
        </div>
    );
};
