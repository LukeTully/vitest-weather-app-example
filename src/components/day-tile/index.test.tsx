import { expect, test } from 'vitest'
import { render, waitFor } from '@testing-library/react';
import { getDayOfWeekFromTimestamp } from '../../utils';
import DayTile, { Weather } from '.';

test('Day-tile renders', async () => {
  const weatherExample: Weather = {
    temp: 21,
    primaryDescriptor: 'Cloudy',
    secondaryDescriptor: 'Might rain',
    iconCode: '01d',
    time: 1699269722,
  }
  const dayTile = render(
    <DayTile
      weather={weatherExample}
      temperature={weatherExample.temp}
      unit={'F'}
      title={getDayOfWeekFromTimestamp(weatherExample.time)}
      classNames={[]}
      key={getDayOfWeekFromTimestamp(weatherExample.time)}
    />,
  )

  await waitFor(() => {
    return expect(dayTile.findByLabelText('Cloudy')).not.toBeNull()
  })
})