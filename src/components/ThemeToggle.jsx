//themeTggle.jsx
import { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import ThemeContext from '../context/Theme/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className={`w-10 cursor-pointer h-7 flex items-center p-1 rounded-full transition-colors duration-300
        ${isDark ? 'bg-gray-800' : 'bg-yellow-300'}`}
        >
            <div
                className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-white
          ${isDark ? 'translate-x-3 bg-blue-600' : 'translate-x-0 bg-yellow-500'}`}
            >
                {isDark ? <FaMoon size={12} /> : <FaSun size={12} />}
            </div>
        </button>
    );
};

export default ThemeToggle;