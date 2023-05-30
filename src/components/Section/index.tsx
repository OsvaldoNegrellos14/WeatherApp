import { PropsWithChildren, useContext } from 'react'
import styles from './index.module.css'
import { ThemeContext } from '../../context/ThemeContext'

/**
 * This is a TypeScript React component that renders a section element with a dynamic class name based
 * on the current theme mode.
 * @param {PropsWithChildren}  - This is a functional component named `Section` that takes in a single
 * prop named `children` of type `PropsWithChildren`.
 * @returns This code is defining a React functional component named `Section`.
 */
export const Section = ({ children }: PropsWithChildren) => {
    const { themeMode } = useContext(ThemeContext)

    return (
        <section className={`${styles[themeMode]} ${styles.container}`}>
            {children}
        </section>
    )
}
