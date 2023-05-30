import { ReactNode, useContext } from 'react'
import styles from './index.module.css'
import { ThemeContext } from '../../context/ThemeContext'

type IModalProps = {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode
}

/**
 * This is a TypeScript React component that renders a modal with a close button and children content,
 * which is only visible when the `isOpen` prop is true.
 * @param {IModalProps}  - - `isOpen`: a boolean value indicating whether the modal should be displayed
 * or not
 * @returns A React component called "Modal" is being returned.
 */
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
