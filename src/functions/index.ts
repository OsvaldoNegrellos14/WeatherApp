import { IDate } from "../interfaces/formatDate"
import { List, ResponseForecast } from "../interfaces/responseForecast"

export const getFormatDate: (dateToConvert: number) => IDate = (dateToConvert: number) => {
  const date: Date = new Date(dateToConvert * 1000)
  const day: number = date.getDay()
  const hour: number = date.getHours()
  const minutes: number = date.getMinutes()
  const daysNames: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const nameDay: string = daysNames[day]
  const formatedHour: string = hour.toString().padStart(2, '0');
  const formatedMinutes: string = minutes.toString().padStart(2, '0');
  return { day, hour: formatedHour, minutes: formatedMinutes, nameDay }
}

type Results = {
  [date: string]: List
}

export const formatDataWeather = (resultForecast: ResponseForecast) => {
  const results: Results = {};
  for (const dataList of resultForecast.list) {
    const fecha = dataList.dt_txt.split(' ')[0];
    if (!results[fecha] || dataList.dt > results[fecha].dt) {
      results[fecha] = dataList;
    }
  }
  const resultsFiltered: List[] = Object.values(results)
  const fiveResults: List[] = resultsFiltered.sort((a: List, b: List) => a.dt - b.dt).slice(0, 5)

  return fiveResults.map((data: List) => {
    const nameDay = getDayName(data.dt)
    const iconPath = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    return {
      nameDay,
      iconPath,
      weatherName: data.weather[0].main,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max
    }
  })
}

const getDayName: (dt: number) => string = (dt) => {
  const date: Date = new Date(dt * 1000);
  const currentDate: Date = new Date();
  const namesDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday: number = date.getDay();
  const esHoy = date.getFullYear() === currentDate.getFullYear() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getDate() === currentDate.getDate();

  const nameDay: string = namesDays[weekday];

  if (esHoy) {
    return 'Today'
  } else {
    return nameDay
  }
}
