import {
  Component,
  ReactNode,
} from 'react';
import WeatherIcon from '../weather-icon';
import { convertDegreesKelvinTo } from '../../utils/utils';


export type TempUnit = 'F' | 'C'
export type Weather = {
  temp: number
  primaryDescriptor: string
  secondaryDescriptor: string
  iconCode: string
  time: number
}

interface DayTileProps {
  temperature: number,
  unit: TempUnit
  title: string
  weather: Weather
  classNames: string[]
}

interface DayTileState {
  /* Placeholder */
}

export default class DayTile extends Component<DayTileProps, DayTileState> {

  formatTemp (temp: number, unit: TempUnit): string {
    /* Pair's temperature value with the selected temp unit
    and formats the value as an integer rather than float */
    return `${temp.toFixed(0)}° ${unit}`
  }

  render(): ReactNode {
      const { title, weather, temperature, unit, classNames} = this.props
      const convertedTemp = convertDegreesKelvinTo(unit, temperature)
      const formattedTemp = this.formatTemp(convertedTemp, unit)
      const containerClasses = [
        'day-tile',
        ...classNames,
      ]
      return (
        <div className={containerClasses.join(' ')}>
          <h3 className={'day-tile-title'}>
            { title }
          </h3>
          <WeatherIcon
            iconWidth={100}
            iconHeight={100}
            iconIdentifier={weather.iconCode}
            description={weather.secondaryDescriptor}
            />
          <div className="temp-container">
            <h4 className='day-tile-temp'>{formattedTemp}</h4>
            <p className='weather-condition-descriptor'>{weather.primaryDescriptor}</p>
          </div>
        </div>
      )
  }
}