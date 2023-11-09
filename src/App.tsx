import {
  Component,
  PropsWithChildren,
  ReactNode,
} from 'react'
import './App.css'
import DayTile from './components/day-tile'
import {
  CityForecast,
  // fetchForecastByCityName,
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
  selectedCity: string | null
  id: string
}
export function CitySelector(props: CitySelectorProps): ReactNode {
  const { onSelect, id, selectedCity } = props
  const cityList: {
    [key: string]: string
  } = {
    'vancouver': 'Vancouver',
    'berlin': 'Berlin',
    'madrid': 'Madrid',
  }
  const getActiveItem = (currentCity: string) => {
    return selectedCity === currentCity ? 'active': ''
  }
  return (
    <menu id={id} className="city-menu">
      {
        Object.keys(cityList).map(
          (cityNameLowercase: string) => (
            <button
              onClick={() => onSelect(cityNameLowercase)}
              className={'menu-button cityname ' + getActiveItem(cityNameLowercase)}
              key={cityNameLowercase}
              >
                {cityList[cityNameLowercase]}
            </button>      
          ),
        )
      }
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
          selectedCity={selectedCity}
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
                        title={getDayOfWeekFromTimestamp(weather.time)}
                        classNames={[]}
                        key={getDayOfWeekFromTimestamp(weather.time)}
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
