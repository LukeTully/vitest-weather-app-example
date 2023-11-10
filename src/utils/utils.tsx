import { Weather } from '../components/day-tile'
export const getDayOfWeekFromTimestamp = (
  timestamp: number,
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
  /* Accepts a Unix timestamp, and returns the day of the week */
  /* Does not (yet) account for timezones */
  const date = new Date(timestamp * 1000)
  return daysOfWeek[date.getDay()]
}

export const createTranslator = (i18nCode: string) => {
  return (path: string) => {
        return translate(i18nCode, path)
  }
}

const translate = (i18nCode: string, path: string): string => {
  /* Imagine that this uses some translation package
  and looks up a statically translated string in a json file */
  return path
}

/* Custom mapping of Api response properties */
export interface CityForecast {
  current: Weather
  daily: Weather[]
  timezone: string
}

export const staticCityCoordinateMapping: {
  [key: string]: [number, number],
} = {
  'vancouver': [49.246292, -123.116226],
  'madrid': [40.398033, -3.710935],
  'berlin': [52.531677, 13.381777],
}

export const staticCityNameMapping: {
  [key: string]: string
} = {
  'vancouver': 'Vancouver',
  'berlin': 'Berlin',
  'madrid': 'Madrid',
}