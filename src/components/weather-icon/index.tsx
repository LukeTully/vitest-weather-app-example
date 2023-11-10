import { ReactNode } from 'react'

export default function WeatherIcon (props: {
  iconWidth: number
  iconHeight: number
  iconIdentifier: string
  description: string
}): ReactNode {
  const { iconWidth, iconHeight, iconIdentifier, description } = props
  return (
    <img src={`https://openweathermap.org/img/wn/${iconIdentifier}@4x.png`} width={iconWidth} height={iconHeight} alt={description}/>
  )
}