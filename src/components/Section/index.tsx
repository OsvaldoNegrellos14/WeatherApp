import { PropsWithChildren, useContext } from 'react'
import styles from './index.module.css'
import { ThemeContext } from '../../context/ThemeContext'

export const Section = ({ children }: PropsWithChildren) => {
    const { themeMode } = useContext(ThemeContext)

    return (
        <section className={`${styles[themeMode]} ${styles.container}`}>
            {children}
        </section>
    )
}
