import { ResponseForecast } from "../../interfaces/responseForecast";
import { ResponseLongLat } from "../../interfaces/responseLongLat";
import { ResponseWeather } from "../../interfaces/responseWeather";

class OpenWeatherMapApi {
    /**
     * This function retrieves the longitude and latitude of a city using an API.
     * @param {string} nameCity - a string representing the name of a city for which the longitude and
     * latitude coordinates are to be retrieved.
     * @returns a Promise that resolves to an array of objects of type ResponseLongLat.
     */
    public async getLongideAndLatitudeByCity(nameCity: string): Promise<ResponseLongLat[]> {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/geo/1.0/direct?q=${nameCity}&appid=${import.meta.env.VITE_APP_API_KEY}`)
            if (!response.ok) {
                throw new Error('API service error')
            }
            return response.json()
        } catch (error) {
            console.error('Error getting the data: ', error)
            throw error;
        }
    }

    
    /**
     * This function retrieves weather data for a given longitude and latitude using an API.
     * @param {number} longitude - The longitude of the location for which the weather data is being requested.
     * @param {number} latitude - The latitude of the location for which the weather data is being requested.
     * @returns a Promise that resolves to an object of type `ResponseWeather`.
     */
    public async getWeatherByCity(longitude: number, latitude: number): Promise<ResponseWeather> {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`)
            if (!response.ok) {
                throw new Error('API service error')
            }
            return response.json()
        } catch (error) {
            console.error('Error getting the data: ', error);
            throw error;
        }
    }

    
    /**
     * This function retrieves a five-day weather forecast from an API using longitude and latitude
     * coordinates.
     * @param {number} longitude - The longitude of the location for which the weather data is being requested.
     * @param {number} latitude - The latitude of the location for which the weather data is being requested.
     * @returns a Promise of type `ResponseForecast`.
     */
    public async getFiveDaysWeatherForecast(longitude: number, latitude: number): Promise<ResponseForecast> {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`)
            if (!response.ok) {
                throw new Error('API service error')
            }
            return response.json()
        } catch (error) {
            console.error('Error getting the data: ', error);
            throw error;
        }
    }
}

export default OpenWeatherMapApi