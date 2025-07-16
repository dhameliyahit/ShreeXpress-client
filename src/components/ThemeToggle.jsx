import React, { useContext } from 'react';
import ThemeContext from '../context/Theme/ThemeContext';
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="flex items-center">
            <div onClick={toggleTheme} className={`w-8 h-8 flex items-center bg-gray-300 dark:bg-[#292929] rounded-full p-1 cursor-pointer transition-colors duration-300`} >
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out flex items-center justify-center`} >
                    <div className={`transition-transform duration-500 ${theme === 'dark' ? 'rotate-[360deg]' : 'rotate-0'}`} >
                        {theme === 'dark' ? (
                            <FaMoon className="text-gray-800 text-md" />
                        ) : (
                            <FaSun className="text-yellow-400 text-md" />
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
