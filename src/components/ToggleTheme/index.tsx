import { useContext } from 'react'
import styles from './index.module.css'
import { ThemeContext } from '../../context/ThemeContext'

/**
 * This is a React component that toggles between light and dark mode using a checkbox and icons.
 * @returns A functional component called `ToggleTheme` is being returned. It renders a toggle switch
 * with a sun and moon icon to represent light and dark mode respectively.
 */
export const ToggleTheme = () => {
    const { isDarkMode, toggleMode } = useContext(ThemeContext)

    return (
        <div>
            <input type="checkbox" className={styles.toggle} id="toggle" checked={isDarkMode} onChange={toggleMode} />
            <label htmlFor="toggle" className={styles.toggleLabel}>
                <i className={`fas fa-sun ${styles.sun}`}></i>
                <i className={`fas fa-moon ${styles.moon}`}></i>
                <span className={styles.ball}></span>
            </label>
        </div>
    )
}
