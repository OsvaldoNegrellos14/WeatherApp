/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, PropsWithChildren, useEffect } from 'react'
import OpenWeatherMapApi from '../services/OpenWeatherMapApi'
import { SearcherContextProps } from '../interfaces/searcherContextProps'
import { ResponseLongLat } from '../interfaces/responseLongLat'
import { ResponseWeather } from '../interfaces/responseWeather'
import { ResponseForecast } from '../interfaces/responseForecast'
import { formatDataWeather } from '../functions'
import { IFormatedForecast } from '../interfaces/formatForecast'

export const SearcherContext = createContext<SearcherContextProps>({
    nameCitySearch: '',
    changeNameCity: () => {},
    searchNameCity: () => {},
    isLoading: false,
    resultWeatherCity: false,
    resultForecast: false,
    error: null
})

export const SearcherProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [nameCitySearch, setNameCitySearch] = useState<string>('')
    const [resultWeatherCity, setResultWeatherCity] = useState<ResponseWeather | false>(false)
    const [resultForecast, setResultForecast] = useState<IFormatedForecast[] | false>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    const api:OpenWeatherMapApi = new OpenWeatherMapApi()

    useEffect(() => {
      const nameCity:string = localStorage.getItem('nameCitySearch') || ''
      const lastSearch = localStorage.getItem('lastSearch') || nameCity
      setNameCitySearch(lastSearch)
      if (lastSearch !== '') {
        searchNameCity(nameCity)
      } else {
        setResultWeatherCity(false)
      }
    }, [])

    const changeNameCity = (nameCity: string) => {
        setNameCitySearch(nameCity)
        localStorage.setItem('nameCitySearch', nameCity)
    }

    const searchNameCity = (nameCity: string) => {
        setIsLoading(true)
        localStorage.setItem('lastSearch', nameCity)
        api.getLongideAndLatitudeByCity(nameCity)
            .then((response: ResponseLongLat[]) => {
                if (response.length > 0) {
                    searchWeather(response[0].lon, response[0].lat)
                } else {
                    setError(new Error('There are not matches with the search'))
                    setIsLoading(false)
                }
            })
            .catch((error: Error) => {
                setError(error)
                setIsLoading(false)
            })
    }

    const searchWeather = (longitude: number, latitude: number) => {
        api.getWeatherByCity(longitude, latitude)
            .then((response: ResponseWeather) => {
                if (response) {
                    setResultWeatherCity(response)
                    fiveDaysForecast(longitude, latitude)
                } else {
                    setError(new Error('There are not matches with the search'))
                    setIsLoading(false)
                }
            })
            .catch((error: Error) => {
                setError(error)
                setIsLoading(false)
            })
    }

    const fiveDaysForecast = (longitude: number, latitude: number) => {
        api.getFiveDaysWeatherForecast(longitude, latitude)
            .then((response: ResponseForecast) => {
                if (response) {
                    const forecastFormated:IFormatedForecast[] = formatDataWeather(response)
                    setResultForecast(forecastFormated)
                } else {
                    setError(new Error('There are not matches with the search'))
                }
            })
            .catch((error: Error) => {
                setError(error)
            })
            .finally(() => setIsLoading(false))
    }

    const theme: SearcherContextProps = {
        nameCitySearch,
        changeNameCity,
        searchNameCity,
        isLoading,
        resultWeatherCity,
        resultForecast,
        error
    }

    return (
        <SearcherContext.Provider value={theme}>{children}</SearcherContext.Provider>
    )
}