import {
  Component,
  PropsWithChildren,
  ReactNode,
} from 'react'
import './App.css'
import DayTile from './components/day-tile'
import {
  CityForecast,
  getDayOfWeekFromTimestamp,
  weatherForCity,
} from './utils'


interface AppState {
  selectedCity: null | string
  forecast: null | CityForecast
}

interface CitySelectorProps {
  onSelect: (cityName: string) => void
}
export function CitySelector (props: CitySelectorProps): ReactNode {
  const { onSelect } = props
  return (
    <menu>
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
      const forecast = await weatherForCity(cityName)
      this.setState({
        selectedCity: cityName,
        forecast: { ...forecast },
      })
    }
  }

  render(): ReactNode {
    const { forecast, selectedCity } = this.state
    return (
      <>
        <h1>Current City: {selectedCity}</h1>
        <CitySelector onSelect={ (cityName: string) => this.changeCity(cityName) }></CitySelector>
        {
          forecast !== null
            ? (
              <DayTile
                weather={ forecast.current }
                temperature={56}
                unit={'C'}
                title={'Today'}
              />
            )
            : <h2>No City Selected</h2>
        }

      </>
    )
  }
}
