import { useContext } from 'react'
import styles from './index.module.css'
import { ThemeContext } from '../../context/ThemeContext'

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
