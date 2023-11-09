import { ReactNode } from 'react'
import { staticCityNameMapping } from '../../utils/utils'

interface CitySelectorProps {
  onSelect: (cityName: string) => void
  selectedCity: string | null
  id: string
}
export function CitySelector(props: CitySelectorProps): ReactNode {
  const { onSelect, id, selectedCity } = props

  const getActiveItem = (currentCity: string) => {
    return selectedCity === currentCity ? 'active' : ''
  }
  return (
    <menu id={id} className="city-menu">
      {
        Object.keys(staticCityNameMapping).map(
          (cityNameLowercase: string) => (
            <button
              onClick={() => onSelect(cityNameLowercase)}
              className={'menu-button cityname ' + getActiveItem(cityNameLowercase)}
              key={cityNameLowercase}
            >
              {staticCityNameMapping[cityNameLowercase]}
            </button>
          ),
        )
      }
    </menu>
  )
}