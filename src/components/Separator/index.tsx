import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import styles from './index.module.css'

/**
 * This is a functional component that renders a div element with a class name based on the current
 * theme mode.
 * @returns The `Separator` component is being returned, which is a `div` element with a class name
 * that is determined by the current `themeMode` context value.
 */
export const Separator = () => {
    const { themeMode } = useContext(ThemeContext)
    return (
        <div className={styles[themeMode]}></div>
    )
}
