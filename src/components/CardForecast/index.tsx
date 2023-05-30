import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import styles from './index.module.css'
import { IFormatedForecast } from "../../interfaces/formatForecast"

type IProps = {
    infoWeather: IFormatedForecast
}

export const CardForecast = ({ infoWeather }: IProps) => {
    const { themeMode } = useContext(ThemeContext)

    return (
        <div className={`${styles[themeMode]} ${styles.container}`}>
            <h5 className={styles.day}>{infoWeather.nameDay}</h5>
            <div className={styles.weather}>
                <img src={infoWeather.iconPath} alt="icon weather" className={styles.iconWeather} />
                <p className={styles.weatherName}>{infoWeather.weatherName}</p>
            </div>
            <p className={styles.temperature}><b className={styles.tempMax}>{Math.trunc(infoWeather.temp_max)}</b>/{Math.trunc(infoWeather.temp_min)}</p>
        </div>
    )
}
