import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import styles from './index.module.css'

type PropsName = {
    iconClass: string;
    label: string;
}

/**
 * This is a TypeScript React component that renders an icon and a label within a container, with the
 * theme mode determined by the context.
 * @param {PropsName}  - The above code defines a React functional component named `IconLabel` that
 * takes two props as input: `iconClass` and `label`.
 * @returns A functional component named `IconLabel` is being returned.
 */
export const IconLabel = ({iconClass, label}: PropsName) => {
    const { themeMode } = useContext(ThemeContext)

    return (
        <div className={`${styles[themeMode]} ${styles.container}`}>
            <i className={`${iconClass} ${styles.image}`} ></i>
            <p>{label}</p>
        </div>
    )
}
