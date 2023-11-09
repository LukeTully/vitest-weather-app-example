import './index.css'
import DayTile from '../../components/day-tile'
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
}
export default function WeeklyForecastGrid(props: WeeklyForecastGridProps) {
  const {
    forecast,
  } = props

  return (
    <div id="weather-container">
      <DayTile
        weather={forecast.current}
        temperature={forecast.current.temp}
        unit={'F'}
        title={'Today'}
        classNames={['current']}
      />
      {
        forecast.daily.map(
          (weather: Weather) => (
            <DayTile
              weather={weather}
              temperature={weather.temp}
              unit={'F'}
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