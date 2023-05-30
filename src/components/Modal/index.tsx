import { ReactNode, useContext } from 'react'
import styles from './index.module.css'
import { ThemeContext } from '../../context/ThemeContext'

type IModalProps = {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode
}

export const Modal = ({ isOpen, onClose, children }: IModalProps) => {
    const { themeMode } = useContext(ThemeContext)
    
    if (!isOpen) return null

    return (
        <div className={`${styles[themeMode]} ${styles.modal}`}>
            <div className={styles.modalContent}>
                <div>
                    {children}
                </div>
                <button className={styles.closeButton} onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
