import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import styles from './index.module.css'

type PropsName = {
    iconClass: string;
    label: string;
}

export const IconLabel = ({iconClass, label}: PropsName) => {
    const { themeMode } = useContext(ThemeContext)

    return (
        <div className={`${styles[themeMode]} ${styles.container}`}>
            <i className={`${iconClass} ${styles.image}`} ></i>
            <p>{label}</p>
        </div>
    )
}
