import './index.css'
import DayTile, { TempUnit } from '../../components/day-tile'
import {
  CityForecast,
  // fetchForecastByCityName,
  getDayOfWeekFromTimestamp,
} from '../../utils/utils'
import {
  Weather,
} from '../day-tile'


type WeeklyForecastGridProps = {
  forecast: CityForecast
  temperatureUnit: TempUnit
  localize: (path: string) => string
}
export default function WeeklyForecastGrid(props: WeeklyForecastGridProps) {
  const {
    forecast,
    temperatureUnit,
    localize,
  } = props

  const todayTitle = localize('Today')
  
  return (
    <div id="weather-container">
      <DayTile
        weather={forecast.current}
        temperature={forecast.current.temp}
        unit={temperatureUnit}
        title={todayTitle}
        classNames={['current']}
      />
      {
        forecast.daily.map(
          (weather: Weather) => (
            <DayTile
              weather={weather}
              temperature={weather.temp}
              unit={temperatureUnit}
              title={getDayOfWeekFromTimestamp(weather.time)}
              classNames={[]}
              key={getDayOfWeekFromTimestamp(weather.time)}
            />
          ),
        )
      }
    </div>
  )
}