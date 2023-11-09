import {
  Component,
  PropsWithChildren,
  ReactNode,
} from 'react'
import './App.css'
import {
  CityForecast,
  // fetchForecastByCityName,
  staticCityNameMapping,
} from './utils/utils'
import {
  weatherForCity,
  mockFetchForecastByCityName,
} from './services/weather'
import WeeklyForecastGrid from './components/weekly-forecast-grid'
import { CitySelector } from './components/city-selector'


interface AppState {
  selectedCity: null | string
  forecast: null | CityForecast
}

export default class App extends Component<PropsWithChildren, AppState> {
  state: AppState = {
    selectedCity: null,
    forecast: null,
  }

  async componentDidMount(): Promise<void> {
    const defaultCity = Object.keys(staticCityNameMapping)[0]
    const forecast = await weatherForCity(defaultCity, mockFetchForecastByCityName)

    delete forecast.daily[0]

    this.setState({
      selectedCity: defaultCity,
      forecast: forecast,
    })
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
          selectedCity={selectedCity}
          id="city-menu"
        />
        {
          forecast !== null
            ? (
              <WeeklyForecastGrid forecast={forecast} />
            )
            : <h2>No city has been selected</h2>
        }
      </main>
    )
  }
}
