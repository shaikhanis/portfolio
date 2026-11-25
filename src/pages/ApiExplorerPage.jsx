import { useEffect, useState } from 'react'
import { RefreshCw, Search } from 'lucide-react'
import DemoLayout from '../layouts/DemoLayout.jsx'
import { useDebouncedValue } from '../hooks/useDebouncedValue.js'

function describeWeather(code) {
  if (code === 0) return 'Clear'
  if (code <= 3) return 'Partly cloudy'
  if (code <= 48) return 'Fog'
  if (code <= 67) return 'Rain'
  if (code <= 77) return 'Snow'
  if (code <= 82) return 'Showers'
  if (code <= 99) return 'Thunderstorms'
  return 'Conditions'
}

function formatDay(value) {
  return new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(`${value}T12:00:00`))
}

export default function ApiExplorerPage() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query.trim(), 300)
  const [places, setPlaces] = useState([])
  const [searchState, setSearchState] = useState('idle')
  const [searchError, setSearchError] = useState('')
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [forecastLoading, setForecastLoading] = useState(false)
  const [forecastError, setForecastError] = useState('')
  const [unit, setUnit] = useState('celsius')
  const [recentPlaces, setRecentPlaces] = useState([])

  useEffect(() => {
    if (debouncedQuery.length < 2) return undefined

    const controller = new AbortController()
    const params = new URLSearchParams({ name: debouncedQuery, count: '5', language: 'en', format: 'json' })
    fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('The place search service is unavailable.')
        return response.json()
      })
      .then((data) => {
        setPlaces(Array.isArray(data.results) ? data.results : [])
        setSearchState('ready')
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setSearchError(error instanceof Error ? error.message : 'Place search failed. Try again.')
        setSearchState('error')
      })

    return () => controller.abort()
  }, [debouncedQuery])

  useEffect(() => {
    if (!selectedPlace) return undefined
    const controller = new AbortController()
    const params = new URLSearchParams({
      latitude: String(selectedPlace.latitude),
      longitude: String(selectedPlace.longitude),
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      forecast_days: '7',
      timezone: 'auto',
    })
    fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('The forecast service could not return a forecast right now.')
        return response.json()
      })
      .then((data) => {
        if (!Array.isArray(data.daily?.time) || !Array.isArray(data.daily?.temperature_2m_max)) {
          throw new Error('The forecast service returned incomplete data. Please retry.')
        }
        setForecast(data.daily)
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setForecastError(error instanceof Error ? error.message : 'The forecast could not be loaded.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setForecastLoading(false)
      })

    return () => controller.abort()
  }, [selectedPlace])

  const choosePlace = (place) => {
    setSelectedPlace(place)
    setForecast(null)
    setForecastError('')
    setForecastLoading(true)
    setPlaces([])
    setQuery('')
    setRecentPlaces((previous) => [
      place,
      ...previous.filter((item) => `${item.name}-${item.country_code}` !== `${place.name}-${place.country_code}`),
    ].slice(0, 4))
  }

  const displayTemp = (value) => {
    if (!Number.isFinite(value)) return '—'
    const converted = unit === 'fahrenheit' ? (value * 9) / 5 + 32 : value
    return `${Math.round(converted)}°`
  }

  const retryForecast = () => {
    setForecast(null)
    setForecastError('')
    setForecastLoading(true)
    setSelectedPlace((place) => place ? { ...place } : place)
  }

  return (
    <DemoLayout
      title="Destination Explorer"
      kind="React API Explorer"
      description="Search for a place and explore a seven-day forecast from a public weather API, with debounced requests, cancellation and clear recovery states."
      notes={['Public REST API', 'Debounced search', 'AbortController', 'Loading and retry states']}
      sourcePath="src/pages/ApiExplorerPage.jsx"
    >
      <section className="demo-panel" aria-label="Destination weather search">
        <div className="explorer-search-wrap">
          <label className="visually-hidden" htmlFor="destination-search">Search for a city</label>
          <div className="explorer-search-row">
            <Search size={18} aria-hidden="true" />
            <input
              id="destination-search"
              className="explorer-search"
              type="search"
              autoComplete="off"
              placeholder="Search a city or destination"
              value={query}
              onChange={(event) => {
                const nextQuery = event.target.value
                setQuery(nextQuery)
                if (nextQuery.trim().length < 2) {
                  setPlaces([])
                  setSearchState('idle')
                  setSearchError('')
                } else {
                  setSearchState('loading')
                  setSearchError('')
                }
              }}
              aria-controls={places.length > 0 ? 'destination-results' : undefined}
              aria-autocomplete="list"
            />
          </div>
          {places.length > 0 ? (
            <ul id="destination-results" className="explorer-results" aria-label="Matching places">
              {places.map((place) => (
                <li key={`${place.id}-${place.country_code}`}>
                  <button
                    type="button"
                    aria-label={`${place.name}, ${place.country}`}
                    onClick={() => choosePlace(place)}
                  >
                    <strong>{place.name}</strong> · {place.admin1 ? `${place.admin1}, ` : ''}{place.country}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {searchState === 'loading' ? <p className="explorer-status" role="status">Searching places…</p> : null}
          {searchState === 'ready' && debouncedQuery.length >= 2 && places.length === 0 ? (
            <p className="explorer-status" role="status">No places found. Try a different city name.</p>
          ) : null}
          {searchError ? <p className="explorer-error" role="alert">{searchError}</p> : null}
        </div>

        {!selectedPlace ? (
          <div className="explorer-status">
            <p>Search for a destination to see its current seven-day outlook.</p>
            {recentPlaces.length > 0 ? (
              <div className="demo-filters" aria-label="Recently viewed places">
                <span>Recent:</span>
                {recentPlaces.map((place) => (
                  <button type="button" className="demo-filter" key={`${place.id}-${place.country_code}`} onClick={() => choosePlace(place)}>
                    {place.name}, {place.country}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <section className="forecast" aria-labelledby="forecast-title">
            <div className="forecast__head">
              <div>
                <p className="mono-label">Selected destination</p>
                <h2 id="forecast-title">{selectedPlace.name}, {selectedPlace.country}</h2>
              </div>
              <div className="forecast__unit" role="group" aria-label="Temperature units">
                <button type="button" aria-pressed={unit === 'celsius'} onClick={() => setUnit('celsius')}>°C <span className="visually-hidden">Celsius</span></button>
                <button type="button" aria-pressed={unit === 'fahrenheit'} onClick={() => setUnit('fahrenheit')}>°F <span className="visually-hidden">Fahrenheit</span></button>
              </div>
            </div>
            {forecastLoading ? <p className="explorer-status" role="status">Loading the 7-day forecast…</p> : null}
            {forecastError ? (
              <div className="explorer-error" role="alert">
                <span>{forecastError}</span>
                <button type="button" onClick={retryForecast}>
                  <RefreshCw size={14} aria-hidden="true" /> Try again
                </button>
              </div>
            ) : null}
            {forecast ? (
              <>
                <h3 className="visually-hidden">7-day outlook</h3>
                <p className="mono-label">7-day outlook</p>
                <ul className="forecast__days" aria-label="7-day forecast">
                  {forecast.time.map((day, index) => (
                    <li className="forecast__day" key={day}>
                      <span>{formatDay(day)}</span>
                      <strong>{describeWeather(forecast.weather_code?.[index] ?? -1)}</strong>
                      <span>
                        {displayTemp(forecast.temperature_2m_max?.[index])}
                        {' / '}
                        {displayTemp(forecast.temperature_2m_min?.[index])}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="forecast__source">
                  Forecast data provided by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>.
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </p>
              </>
            ) : null}
          </section>
        )}
      </section>
    </DemoLayout>
  )
}
