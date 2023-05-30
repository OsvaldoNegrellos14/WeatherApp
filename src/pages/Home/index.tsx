import { useContext, useEffect, useState } from 'react'
import { CardForecast, CardHighlight, IconLabel, Input, Loading, Modal, Section, Separator, ToggleTheme } from '../../components'
import { ThemeContext } from '../../context/ThemeContext'
import { SearcherContext } from '../../context/SearcherContext'
import { IDate } from '../../interfaces/formatDate'
import { getFormatDate } from '../../functions'
import styles from './index.module.css'

const INITIAL_STATE = { day: 0, hour: '', minutes: '', nameDay: '' }

function Home() {
  const { themeMode } = useContext(ThemeContext)
  const { resultWeatherCity, resultForecast, isLoading, error } = useContext(SearcherContext)
  const [windKmH, setWindKmH] = useState<string>('0')
  const [currentDate, setCurrentDate] = useState<IDate>(INITIAL_STATE)
  const [sunriseDate, setSunriseDate] = useState<IDate>(INITIAL_STATE)
  const [sunsetDate, setSunsetDate] = useState<IDate>(INITIAL_STATE)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState<string>('')
  const [modalAction, setModalAction] = useState<string>('')
  const [iconPath, setIconPath] = useState<string>('')

  useEffect(() => {
    if (resultWeatherCity && typeof resultWeatherCity === 'object'
      && resultForecast && typeof resultWeatherCity === 'object') {
      setIconPath(`https://openweathermap.org/img/wn/${resultWeatherCity.weather[0].icon}@2x.png`)
      setWindKmH((resultWeatherCity.wind.speed * 3.6).toFixed(2))
      setCurrentDate(getFormatDate(resultWeatherCity.dt))
      setSunriseDate(getFormatDate(resultWeatherCity.sys.sunrise))
      setSunsetDate(getFormatDate(resultWeatherCity.sys.sunset))
    }
  }, [resultWeatherCity, resultForecast])

  useEffect(() => {
    if (error) {
      setModalText(error.message)
      setModalAction('Try again')
      openModal()
    }
  }, [error])

  /**
   * This function sets the state of a modal to open.
   */
  const openModal = () => {
    setIsModalOpen(true);
  }

  /**
   * This function sets the state of a modal to false, effectively closing it.
   */
  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className={styles[themeMode]}>
      <Modal isOpen={isModalOpen} onClose={closeModal} >
        <div className={styles.modalBody}>
          <p className={styles.modalTitle}>Oops!</p>
          <p className={styles.modalText}>{modalText}</p>
          <p className={styles.modalAction}>{modalAction}</p>
        </div>
      </Modal>
      {isLoading && <Loading />}
      {
        resultWeatherCity
          ? (
            <div className={styles.containerPage}>
              <div className={styles.containerHeader}>
                <div className={styles.containerInput}>
                  <Input />
                </div>
                <ToggleTheme />
              </div>
              <div className={styles.content}>
                <main className={styles.weatherCity}>
                  <Section>
                    <div className={styles.mainContent}>
                    <p className={styles.nameCity}>{resultWeatherCity.name}</p>
                    <p className={styles.description}>{resultWeatherCity.weather[0].description}</p>
                    <div className={styles.containerIcon}>
                      <img src={iconPath} alt="icon current weather" className={styles.iconWeather} />
                      <p className={styles.temperature}>{Math.trunc(resultWeatherCity.main.temp)}°C</p>
                      <p className={styles.dayAndHour}>{currentDate.nameDay}, {currentDate.hour}:{currentDate.minutes}</p>
                    </div>
                    <Separator />
                    <div className={styles.thermalSensation}>
                      <IconLabel iconClass={'far fa-sun'} label={`Sunrise - ${sunriseDate.hour}:${sunriseDate.minutes} hrs.`} />
                      <IconLabel iconClass={'fas fa-sun'} label={`Sunset - ${sunsetDate.hour}:${sunsetDate.minutes} hrs.`} />
                    </div>
                    </div>
                  </Section>
                </main>
                <div className={styles.forecast}>
                  <Section>
                    <div className={styles.forecastContent}>
                    <h3 className={styles.titleSection}>5-DAY FORECAST</h3>
                    {
                      resultForecast && resultForecast.length > 0 && resultForecast.map((data, index) => {
                        return index === resultForecast.length - 1
                          ? <CardForecast infoWeather={data} key={index} />
                          : <div key={index}><CardForecast infoWeather={data} /> <Separator /></div>
                      })
                    }
                    </div>
                  </Section>
                </div>
                <div className={styles.highlights}>
                  <Section>
                    <h3 className={styles.titleSection}>TODAY'S HIGHLIGHTS</h3>
                    <div className={styles.highlightsContainer}>
                      <div className={styles.humidity}>
                        <CardHighlight infoHighlight={{ iconClass: 'fas fa-thermometer-half', label: 'Humidity', data: resultWeatherCity.main.humidity.toString() + '%' }} />
                      </div>
                      <div className={styles.wind}>
                        <CardHighlight infoHighlight={{ iconClass: 'fas fa-wind', label: 'Wind', data: windKmH + ' km/h' }} />
                      </div>
                      <div className={styles.pressure}>
                        <CardHighlight infoHighlight={{ iconClass: 'fas fa-water', label: 'Pressure', data: resultWeatherCity.main.pressure.toString() + ' hPa' }} />
                      </div>
                      <div className={styles.cloudiness}>
                        <CardHighlight infoHighlight={{ iconClass: 'fas fa-cloud', label: 'Cloudiness', data: resultWeatherCity.clouds.all.toString() + '%' }} />
                      </div>
                    </div>
                  </Section>
                </div>
              </div>
            </div>
          )
          :
          (
            <div className={styles.search}>
              <ToggleTheme />
              <p className={styles.text}>First time here? Great! <br />To start...</p>
              <div className={styles.input}>
                <Input />
              </div>
            </div>
          )
      }
    </div>
  )
}

export default Home
