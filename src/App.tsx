import {
  Component,
  PropsWithChildren,
  ReactNode,
} from 'react'
import './App.css'
import {
  CityForecast,
  createTranslator,
  // fetchForecastByCityName,
  staticCityNameMapping,
} from './utils/utils'
import {
  weatherForCity,
  mockFetchForecastByCityName,
  fetchForecastByCityName,
} from './services/weather'
import WeeklyForecastGrid from './components/weekly-forecast-grid'
import { CitySelector } from './components/city-selector'
import { TempUnit } from './components/day-tile'


interface AppState {
  selectedCity: null | string
  forecast: null | CityForecast
  temperatureUnit: TempUnit
  language: string
}

export default class App extends Component<PropsWithChildren, AppState> {
  state: AppState = {
    selectedCity: null,
    forecast: null,
    temperatureUnit: 'C',
    language: 'string',
  }

  /* Set a default translator to be overriden if a user has selected something else */
  translator: (path: string) => string = createTranslator('en-CA')

  async componentDidMount(): Promise<void> {
    const defaultCity = Object.keys(staticCityNameMapping)[0]
    const forecast = await weatherForCity(defaultCity, mockFetchForecastByCityName)
    
    this.translator = createTranslator(this.state.language)

    this.setState({
      selectedCity: defaultCity,
      forecast: forecast,
    })
  }

  async changeCity(cityName: string) {
    if (typeof cityName === 'string' && cityName !== this.state.selectedCity) {
      // const forecast = await weatherForCity(cityName, mockFetchForecastByCityName)
      const forecast = await weatherForCity(cityName, fetchForecastByCityName)
      this.setState({
        selectedCity: cityName,
        forecast: { ...forecast },
      })
    }
  }

  localize (path: string): string {
    if(this.translator !== null) {
      return this.translator(path)
    }
    return ''
  }
 
  render(): ReactNode {
    const {
      forecast,
      selectedCity,
      temperatureUnit,
    } = this.state
    const missingForecastErrorMessage = this.localize('No city has been selected')


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
              <WeeklyForecastGrid
                forecast={forecast}
                temperatureUnit={temperatureUnit}
                localize={(path: string) => this.localize(path)}
                />
            )
            : <h2>{missingForecastErrorMessage}</h2>
        }
      </main>
    )
  }
}
