import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import styles from './index.module.css'
import { SearcherContext } from '../../context/SearcherContext'

/**
 * This is a functional component that renders an input field and a search button, and handles user
 * input to search for cities.
 * @returns A functional component named "Input" is being returned. It renders a form with an input
 * field and a button.
 */
export const Input = () => {
    const { themeMode } = useContext(ThemeContext)
    const { nameCitySearch, changeNameCity, searchNameCity } = useContext(SearcherContext)

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        searchNameCity(nameCitySearch)
      };
    
      const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        searchNameCity(nameCitySearch)
      };

    return (
        <form onSubmit={handleSubmit} className={`${styles[themeMode]} ${styles.containerInput}`}>
            <input
                type="text"
                placeholder='Search for cities'
                className={styles.inputSearch}
                value={nameCitySearch}
                onChange={(e) => changeNameCity(e.target.value)}
            />
            <button onClick={handleClick} className={styles.buttonSubmit}>search</button>
        </form>
    )
}
