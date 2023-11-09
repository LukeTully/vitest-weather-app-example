import {
  Component,
  ReactNode,
} from 'react';


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
  
}


export function WeatherIcon (props: {
  iconWidth: number
  iconHeight: number
  iconIdentifier: string
  description: string
}): ReactNode {
  const { iconWidth, iconHeight, iconIdentifier, description } = props
  // TODO: Replace this with a real dynamic url
  return (
    <img src={`https://openweathermap.org/img/wn/${iconIdentifier}@4x.png`} width={iconWidth} height={iconHeight} alt={description}/>
  )
}

export default class DayTile extends Component<DayTileProps, DayTileState> {

  formatTemp (temp: number, unit: TempUnit): string {
    return `${temp.toFixed(0)}° ${unit}`
  }
  render(): ReactNode {
      const { title, weather, temperature, unit, classNames} = this.props
      const formattedTemp = this.formatTemp(temperature, unit)
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