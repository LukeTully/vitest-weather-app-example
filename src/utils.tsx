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
}

const staticCityCoordinateMapping: {
  [key: string]: [number, number],
} = {
  'vancouver': [49.246292, -123.116226],
  'madrid': [40.398033, -3.710935],
  'berlin': [52.531677, 13.381777],
}
export const fetchForecastForLatLng = async (
  latlng: number[],
): Promise<OpenWeatherMapResponseFull> => {
  const mockResponse: OpenWeatherMapResponseFull = {
    lon: -0.13,
    lat: 51.51,
    timezone: 'America/Chicago',
    timezone_offset: -18000,
    current: {
      dt: 1485789600,
      temp: 280.32,
      weather: {
        id: 300,
        main: 'Drizzle',
        description: 'light intensity drizzle',
        icon: '09d',
      },
    },
    daily: [
      {
        dt: 1485789600,
        temp: 280.32,
        weather: {
          id: 300,
          main: 'Drizzle',
          description: 'light intensity drizzle',
          icon: '09d',
        },
      },
      {
        dt: 1485789600,
        temp: 280.32,
        weather: {
          id: 300,
          main: 'Drizzle',
          description: 'light intensity drizzle',
          icon: '09d',
        },
      },
      {
        dt: 1485789600,
        temp: 280.32,
        weather: {
          id: 300,
          main: 'Drizzle',
          description: 'light intensity drizzle',
          icon: '09d',
        },
      },
      {
        dt: 1485789600,
        temp: 280.32,
        weather: {
          id: 300,
          main: 'Drizzle',
          description: 'light intensity drizzle',
          icon: '09d',
        },
      },
      {
        dt: 1485789600,
        temp: 280.32,
        weather: {
          id: 300,
          main: 'Drizzle',
          description: 'light intensity drizzle',
          icon: '09d',
        },
      },
    ],
  }
  return Promise.resolve(
    { ...mockResponse },
  )
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