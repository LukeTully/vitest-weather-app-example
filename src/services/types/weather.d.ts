export interface OpenWeatherMapResponseItem {
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  dt: number
}
export type DailyResponseItem = (OpenWeatherMapResponseItem & {
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
})
export type CurrentResponseItem = OpenWeatherMapResponseItem & { temp: number }
export interface OpenWeatherMapResponseFull {
  lon: number
  lat: number
  timezone: string
  timezone_offset: number
  current: CurrentResponseItem
  daily: DailyResponseItem[]
}

export type ForecastPayload = {
  [key: string]: unknown
  lat: number
  lon: number
  exclude?: string[]
  appid: string
}