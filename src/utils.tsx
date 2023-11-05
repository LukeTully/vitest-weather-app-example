import { Weather } from './components/day-tile'

export const getDayOfWeekFromTimestamp = (
  timestamp: number,
  timezone: string,
): string => {
  /* Accepts a Unix timestamp, and timezone, and returns the day of the week */
  return ''
}

export interface OpenWeatherMapResponseItem {
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }
  dt: number
  temp: number
}

export interface OpenWeatherMapResponseFull {
  lon: number
  lat: number
  timezone: string
  timezone_offset: number
  current: OpenWeatherMapResponseItem
  daily: OpenWeatherMapResponseItem[]
}

/* Custom mapping of Api response properties */
export interface CityForecast {
  current: Weather
  daily: Weather[]
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
export const weatherForCity = async (city: string): Promise<CityForecast> => {
  const staticCityCoordinateMapping: {
    [key: string]: number[],
  } = {
    'Vancouver': [49.246292, -123.116226],
    'Madrid': [40.398033, -3.710935],
    'Berlin': [52.531677, 13.381777],
  }

  const weatherResponse: OpenWeatherMapResponseFull = await fetchForecastForLatLng(staticCityCoordinateMapping[city])

  const remapResponseProps = (original: OpenWeatherMapResponseItem): Weather => {
    return {
      temp: original.temp,
      time: original.dt,
      primaryDescriptor: original.weather.main,
      secondaryDescriptor: original.weather.description,
      iconCode: original.weather.icon,
    }
  }
  return {
    current: remapResponseProps(weatherResponse.current),
    daily: [
      ...weatherResponse.daily.map((dailyWeatherItem: OpenWeatherMapResponseItem): Weather => remapResponseProps(dailyWeatherItem)),
    ],
  }

}