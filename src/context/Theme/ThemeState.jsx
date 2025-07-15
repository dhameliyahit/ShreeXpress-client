import { useEffect, useState } from 'react';
import ThemeContext from './ThemeContext';

export default function ThemeState(props) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light'; // default light
    });

    useEffect(() => {
        const root = window.document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
