import { Weather } from './components/day-tile'
import Berlin from './assets/static/mock-responses/berlin-forecast.json';
import Vancouver from './assets/static/mock-responses/vancouver-forecast.json';
import Madrid from './assets/static/mock-responses/madrid-forecast.json';

export const getDayOfWeekFromTimestamp = (
  timestamp: number,
  timezone: string,
): string => {
  const daysOfWeek: {
    [key: number]: string
  } = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tues',
    3: 'Wed',
    4: 'Thurs',
    5: 'Fri',
    6: 'Sat',
  }
  /* Accepts a Unix timestamp, and timezone, and returns the day of the week */
  const date = new Date(timestamp * 1000)
  return daysOfWeek[date.getDay()]
}

export interface OpenWeatherMapResponseItem {
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  dt: number
}

type DailyResponseItem = (OpenWeatherMapResponseItem & {
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
})

type CurrentResponseItem = OpenWeatherMapResponseItem & { temp: number }
export interface OpenWeatherMapResponseFull {
  lon: number
  lat: number
  timezone: string
  timezone_offset: number
  current: CurrentResponseItem
  daily: DailyResponseItem[]
}

/* Custom mapping of Api response properties */
export interface CityForecast {
  current: Weather
  daily: Weather[]
  timezone: string
}

const staticCityCoordinateMapping: {
  [key: string]: [number, number],
} = {
  'vancouver': [49.246292, -123.116226],
  'madrid': [40.398033, -3.710935],
  'berlin': [52.531677, 13.381777],
}

type ForecastPayload = {
  [key: string]: unknown
  lat: number
  lon: number
  exclude?: string[]
  appid: string
}
export const createForecastRequest = async (params: ForecastPayload): Promise<OpenWeatherMapResponseFull> => {
  const url = `${baseUrl}${endpoint}`
  const parsedExclude = params?.exclude?.map((e) => e.replace(/\W/i, '')).join(',') ?? ''
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }

  // The rather messy below type coercion is due to this issue https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1568 
  const urlParams = new URLSearchParams(
      {
        ...params,
        exclude: parsedExclude,
      } as unknown as Record<string, string>,
  )
  const res = await fetch(`${url}?${urlParams}`, options)
  return res.json()
}

export const OPEN_WEATHER_APP_ID = 'b4d3928393d7438c53bb22109c916c40'
export const baseUrl = 'https://api.openweathermap.org'
export const endpoint = '/data/3.0/onecall'
//lat=52.531677&lon=13.381777&exclude=minutely,hourly&appid=b4d3928393d7438c53bb22109c916c40
export const fetchForecastForLatLng = async (
  latlng: [number, number],
): Promise<OpenWeatherMapResponseFull> => {
  const forecastData = await createForecastRequest({
    lat: latlng[0],
    lon: latlng[1],
    appid: OPEN_WEATHER_APP_ID,
    exclude: [
      'hourly',
      'minutely',
    ],
  })

  return forecastData
}

export const fetchForecastByCityName = (city: string): Promise<OpenWeatherMapResponseFull> => {
  const cityCoords = staticCityCoordinateMapping[city.toLocaleLowerCase()]
  if (cityCoords !== undefined) {
    return fetchForecastForLatLng(cityCoords)
  } else {
    return Promise.reject('Could not find city in coordinate mapping')
  }
}

export const mockFetchForecastByCityName = (city: string): Promise<OpenWeatherMapResponseFull> => {
  const failedLookupErrorMessage = 'Could not find city in coordinate mapping'
  const cityCoords = staticCityCoordinateMapping[city.toLocaleLowerCase()]
  if (cityCoords !== undefined) {
    switch (city) {
      case 'vancouver':
        return Promise.resolve(Vancouver)
      case 'berlin':
        return Promise.resolve(Berlin)
      case 'madrid':
        return Promise.resolve(Madrid)
      default:
        Promise.reject(failedLookupErrorMessage)
    }
  }
  return Promise.reject(failedLookupErrorMessage)

}

/* Mock api for testing against real but static data */
type ForecastFetcher = (city: string) => Promise<OpenWeatherMapResponseFull>
export const weatherForCity = async (city: string, fetchForecast: ForecastFetcher): Promise<CityForecast> => {

  const weatherResponse: OpenWeatherMapResponseFull = await fetchForecast(city)

  const remapResponseProps = (original: CurrentResponseItem | DailyResponseItem): Weather => {
    const isCurrentTemp = (responseItem: CurrentResponseItem | DailyResponseItem): responseItem is DailyResponseItem => {
      return responseItem.temp.hasOwnProperty('day')
    }
    return {
      temp: isCurrentTemp(original) ? original.temp.day : original.temp,
      time: original.dt,
      primaryDescriptor: original.weather[0].main,
      secondaryDescriptor: original.weather[0].description,
      iconCode: original.weather[0].icon,
    }
  }
  return {
    timezone: weatherResponse.timezone,
    current: remapResponseProps(weatherResponse.current),
    daily: [
      ...weatherResponse.daily.map((dailyWeatherItem: DailyResponseItem): Weather => remapResponseProps(dailyWeatherItem)),
    ],
  }

}