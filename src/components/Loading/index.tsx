import { useContext } from 'react'
import styles from './index.module.css'
import { ThemeContext } from '../../context/ThemeContext'

/**
 * This is a functional component that renders a loading animation with a theme mode based on the
 * context.
 */
export const Loading = () => {
    const { themeMode } = useContext(ThemeContext)

    return (
        <div className={`${styles[themeMode]} ${styles.container}`}>
            <div className={styles.ldsRipple}><div></div><div></div></div>
        </div>
    )
}
