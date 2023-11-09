import { expect, test } from 'vitest'

import { getDayOfWeekFromTimestamp, mockFetchForecastByCityName, weatherForCity } from './utils';

test('Correctly parse day of the week abbreviation', () => {
  const berlinMockTime = 1699269722
  const expectedResult = 'Mon'
  expect(getDayOfWeekFromTimestamp(berlinMockTime)).toBe(expectedResult)
})

test('Returns an expected forecast object using a mockable network method', async () => {
  const forecast = await weatherForCity('berlin', mockFetchForecastByCityName)
  expect(forecast.current.primaryDescriptor).toBe('Clouds')
})