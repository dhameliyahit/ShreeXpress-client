import React, { useContext } from 'react';
import ThemeContext from '../context/Theme/ThemeContext';
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="flex items-center">
            <div
                onClick={toggleTheme}
                className={`w-14 h-8 flex items-center bg-gray-300 dark:bg-[#292929] rounded-full p-1 cursor-pointer transition-colors duration-300`}
            >
                <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out flex items-center justify-center
                        ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}
                >
                    {theme === 'dark' ? <FaMoon className="text-gray-800 text-sm" /> : <FaSun className="text-yellow-400 text-sm" />}
                </div>
            </div>
        </div>
    );
}
