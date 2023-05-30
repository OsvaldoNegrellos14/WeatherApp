import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import styles from './index.module.css'

export const Separator = () => {
    const { themeMode } = useContext(ThemeContext)
    return (
        <div className={styles[themeMode]}></div>
    )
}
