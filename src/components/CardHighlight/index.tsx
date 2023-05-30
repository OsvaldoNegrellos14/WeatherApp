import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import styles from './index.module.css'

type InfoHighlight = {
  iconClass: string;
  label: string;
  data: string
}

type IProps = {
  infoHighlight: InfoHighlight
}

/**
 * This is a TypeScript React component that renders a card with highlighted information.
 * @param {IProps}  - The function `CardHighlight` takes in a single parameter `infoHighlight` of type
 * `IProps`.
 * @returns A React functional component that renders a card with highlighted information, based on the
 * props passed to it.
 */
export const CardHighlight = ({ infoHighlight }: IProps) => {
  const { themeMode } = useContext(ThemeContext)

  return (
    <div className={styles[themeMode]}>
      <div className={styles.header}>
        <i className={`${infoHighlight.iconClass} ${styles.iconHighlight}`}></i>
        <p className={styles.label}>{infoHighlight.label}</p>
      </div>
      <p className={styles.data}>{infoHighlight.data}</p>
    </div>
  )
}
