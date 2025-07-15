import React, { useContext } from 'react'
import ThemeContext from '../context/Theme/ThemeContext';
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
    const context = useContext(ThemeContext);
    const { theme, toggleTheme } = context

    return (
        <>
            <button onClick={toggleTheme}
                className="border p-2 rounded-md text-lg dark:bg-white dark:text-black bg-black text-white transition"
            >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
        </>
    )
}
