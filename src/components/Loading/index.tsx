import { useContext } from 'react'
import styles from './index.module.css'
import { ThemeContext } from '../../context/ThemeContext'

export const Loading = () => {
    const { themeMode } = useContext(ThemeContext)

    return (
        <div className={`${styles[themeMode]} ${styles.container}`}>
            <div className={styles.ldsRipple}><div></div><div></div></div>
        </div>
    )
}
