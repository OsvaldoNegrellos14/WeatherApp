import { IFormatedForecast } from "./formatForecast";
import { ResponseWeather } from "./responseWeather";

export interface SearcherContextProps {
    nameCitySearch: string,
    changeNameCity: (nameCity: string) => void,
    searchNameCity: (nameCity: string) => void,
    isLoading: boolean,
    resultWeatherCity: ResponseWeather | false,
    resultForecast: IFormatedForecast[] | false,
    error: Error | null
}