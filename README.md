# React + TypeScript + Vite + Vitest

## Components
This app is divided into as many subcomponents as necessary to achieve a sensible division of logic and rendering output, and intuitiveness in testing. Each component is designed to theoretically be composable, and as decoupled from the underlying source of data as seemed reasonable.

- WeeklyForecastGrid
- DayTile
- WeatherIcon

Each component is located in an `index.tsx` file within it’s own subfolder inside `src/components` alongside its respective `index.test.tsx` and `index.css` files.

There is also a global`utils.tsx` and `utils.test.tsx` that stores general functions, and a starting point for a services directory that maintains anything related to network interaction, which in this app is any call or mock call to [openweathermap](https://openweathermap.org).
## Open Weather Map
All icons and api data come from [open weather map](https://api.openweathermap.org) and I’m using a free account with hard limits. The icons are limited to dimensions of 200x200, so I’m doing what I can with layout.

## Expanding the ESLint configuration
I’ve extended the standard react eslint config with the following rules:
- `'comma-dangle': ["error", "always-multiline"]`
- `'quotes': ["error", "single"]`

I find that dangling commas make for cleaner diffs, while the quote selection is just an arbitrary choice that helps maintain consistency and helps remind me I’m not writing Swift.

## Testing (vitest/react-testing-library)
I’m using [Vitest](https://vitest.dev/) for testing, since I’m using [Vite](https://vitejs.dev/) as the main build tool. Vitest is almost indistinguishable from Jest, is more performant, and is recommended by [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)

I've only added a few tests as a starting point and demonstration, complete test coverage was not in scope for this project.

## Design
I was happy to make use of grid and subgrid for even this relatively simple layout. I was somewhat constrained visually because the icons from openweathermap aren’t so versatile in terms of their colours, so I tried to choose the least offensive combination of colours that complement the bright oranges that some of them have. I think this would be a fine starting point for a more sophisticated forecasting integration, but I’d probably look for a more robust API that allows customization at request time, or returns SVG so that each shape could be dynamically adjusted. Another alternative would be a complete re-implementation using self-hosted icons, or a different custom font library.

I've chosen a fixed grid to stay within a smaller scope, so it's not responsive, but the layout I chose could easily be iterated on and made adaptable to different screen sizes using a mobile-first approach.