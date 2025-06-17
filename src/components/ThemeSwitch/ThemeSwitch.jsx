import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import styles from './ThemeSwitch.module.scss';

export default function ThemeSwitch() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
        document.documentElement.setAttribute(
            'data-theme',
            !darkMode ? 'dark' : 'light'
        );
    };

    return (
        <button
            title={`Change to ${darkMode ? 'Light Mode' : 'Dark Mode'}`}
            className={styles.themeToggle}
            onClick={toggleTheme}
        >
            {darkMode ? <FaMoon /> : <FaSun />}
        </button>
    );
}
