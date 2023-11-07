import {
  Component,
  PropsWithChildren,
  ReactNode,
} from 'react'
import './App.css'
import DayTile from './components/day-tile'
import {
  CityForecast,
  fetchForecastByCityName,
  getDayOfWeekFromTimestamp,
  mockFetchForecastByCityName,
  weatherForCity,
} from './utils'


interface AppState {
  selectedCity: null | string
  forecast: null | CityForecast
}

interface CitySelectorProps {
  onSelect: (cityName: string) => void
  id: string
}
export function CitySelector(props: CitySelectorProps): ReactNode {
  const { onSelect, id } = props
  return (
    <menu id={id}>
      <button onClick={() => onSelect('vancouver')}>Vancouver</button>
      <button onClick={() => onSelect('berlin')}>Berlin</button>
      <button onClick={() => onSelect('madrid')}>Madrid</button>
    </menu>
  )
}


export default class App extends Component<PropsWithChildren, AppState> {
  state: AppState = {
    selectedCity: null,
    forecast: null,
  }

  async changeCity(cityName: string) {
    if (typeof cityName === 'string' && cityName !== this.state.selectedCity) {
      const forecast = await weatherForCity(cityName, mockFetchForecastByCityName)
      // const forecast = await weatherForCity(cityName, fetchForecastByCityName)
      delete forecast.daily[0]
      this.setState({
        selectedCity: cityName,
        forecast: { ...forecast },
      })
    }
  }

  render(): ReactNode {
    const { forecast, selectedCity } = this.state
    return (
      <main id="app-container">
        <CitySelector
          onSelect={(cityName: string) => this.changeCity(cityName)}
          id="city-menu"
        />

        <div id="weather-container">
          {
            forecast !== null
              ? (
                <>
                  <DayTile
                    weather={forecast.current}
                    temperature={forecast.current.temp}
                    unit={'F'}
                    title={'Today'}
                    classNames={['current']}
                  />
                  {
                    forecast.daily.map(weather => (
                      <DayTile
                        weather={weather}
                        temperature={weather.temp}
                        unit={'F'}
                        title={getDayOfWeekFromTimestamp(weather.time, forecast.timezone)}
                        classNames={[]}
                        key={getDayOfWeekFromTimestamp(weather.time, forecast.timezone)}
                      />
                    ))
                  }
                </>
              )
              : <h2>No City Selected</h2>
          }
        </div>
      </main>
    )
  }
}
