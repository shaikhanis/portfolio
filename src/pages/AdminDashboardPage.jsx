import { useEffect, useMemo, useState } from 'react'
import { ArrowDownUp, RefreshCw } from 'lucide-react'
import DemoLayout from '../layouts/DemoLayout.jsx'

const DAY = 86_400_000
const REFERENCE_TIME = Date.now()
const regions = ['All regions', 'North', 'South', 'East', 'West']
const products = ['All products', 'Holiday', 'Hotel', 'Flight', 'Forex']

function daysAgo(days) {
  return new Date(REFERENCE_TIME - days * DAY).toISOString().slice(0, 10)
}

const bookings = [
  { id: 'BK-1048', guest: 'Guest 01', product: 'Holiday', region: 'West', date: daysAgo(2), amount: 1280, status: 'Confirmed' },
  { id: 'BK-1047', guest: 'Guest 02', product: 'Hotel', region: 'South', date: daysAgo(4), amount: 640, status: 'Confirmed' },
  { id: 'BK-1046', guest: 'Guest 03', product: 'Flight', region: 'North', date: daysAgo(6), amount: 420, status: 'Pending' },
  { id: 'BK-1045', guest: 'Guest 04', product: 'Holiday', region: 'East', date: daysAgo(9), amount: 1950, status: 'Confirmed' },
  { id: 'BK-1044', guest: 'Guest 05', product: 'Forex', region: 'West', date: daysAgo(12), amount: 210, status: 'Confirmed' },
  { id: 'BK-1043', guest: 'Guest 06', product: 'Hotel', region: 'North', date: daysAgo(16), amount: 880, status: 'Pending' },
  { id: 'BK-1042', guest: 'Guest 07', product: 'Flight', region: 'South', date: daysAgo(21), amount: 510, status: 'Confirmed' },
  { id: 'BK-1041', guest: 'Guest 08', product: 'Holiday', region: 'West', date: daysAgo(27), amount: 2240, status: 'Confirmed' },
  { id: 'BK-1040', guest: 'Guest 09', product: 'Hotel', region: 'East', date: daysAgo(48), amount: 730, status: 'Cancelled' },
  { id: 'BK-1039', guest: 'Guest 10', product: 'Forex', region: 'North', date: daysAgo(74), amount: 360, status: 'Confirmed' },
]

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function AdminDashboardPage() {
  const [range, setRange] = useState(30)
  const [region, setRegion] = useState('All regions')
  const [product, setProduct] = useState('All products')
  const [ascending, setAscending] = useState(false)
  const [simulateError, setSimulateError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 260)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredBookings = useMemo(() => {
    const cutoff = REFERENCE_TIME - range * DAY
    return bookings
      .filter((booking) => new Date(`${booking.date}T00:00:00`).getTime() >= cutoff)
      .filter((booking) => region === 'All regions' || booking.region === region)
      .filter((booking) => product === 'All products' || booking.product === product)
      .sort((first, second) => ascending ? first.amount - second.amount : second.amount - first.amount)
  }, [range, region, product, ascending])

  const total = filteredBookings.reduce((sum, booking) => sum + booking.amount, 0)
  const confirmed = filteredBookings.filter((booking) => booking.status === 'Confirmed').length

  const triggerFailure = () => {
    setLoading(true)
    setError('')
    window.setTimeout(() => {
      setLoading(false)
      setError('The mock bookings service returned an error. Your current filters are unchanged.')
    }, 250)
  }

  const retry = () => {
    setLoading(true)
    setError('')
    window.setTimeout(() => {
      setLoading(false)
      if (simulateError) {
        setError('The mock bookings service returned an error. Turn off the simulation and retry.')
      }
    }, 250)
  }

  return (
    <DemoLayout
      title="Bookings Analytics Dashboard"
      kind="React Admin Dashboard"
      description="An interactive analytics dashboard using fictional booking records to demonstrate filtering, sorting, data visualization and recoverable loading states."
      notes={['Responsive layout', 'Mock API states', 'Sortable table', 'SVG visualization']}
      sourcePath="src/pages/AdminDashboardPage.jsx"
    >
      <div className="demo-panel">
        <div className="demo-toolbar">
          <div>
            <p className="mono-label">Sample workspace</p>
            <h2 className="demo-title-row">Bookings overview</h2>
          </div>
          <div className="demo-toggle-row">
            <span className="demo-toggle-label">Simulate API error</span>
            <button
              type="button"
              className="demo-toggle"
              role="switch"
              aria-label="Simulate API error"
              aria-checked={simulateError}
              onClick={() => {
                const next = !simulateError
                setSimulateError(next)
                if (next) triggerFailure()
              }}
            />
          </div>
        </div>

        <div className="demo-controls">
          <div className="demo-filters" aria-label="Date range">
            {[7, 30, 90].map((days) => (
              <button
                type="button"
                className="demo-filter"
                aria-pressed={range === days}
                key={days}
                onClick={() => setRange(days)}
              >
                {days}D
              </button>
            ))}
          </div>
          <div className="demo-filters">
            <label className="visually-hidden" htmlFor="dashboard-region">Filter by region</label>
            <select id="dashboard-region" className="demo-select" value={region} onChange={(event) => setRegion(event.target.value)}>
              {regions.map((item) => <option key={item}>{item}</option>)}
            </select>
            <label className="visually-hidden" htmlFor="dashboard-product">Filter by product</label>
            <select id="dashboard-product" className="demo-select" value={product} onChange={(event) => setProduct(event.target.value)}>
              {products.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>

        {loading ? <p className="explorer-status" role="status">Loading booking data…</p> : null}
        {error ? (
          <div className="demo-alert" role="alert">
            <span>{error}</span>
            <button type="button" onClick={retry}><RefreshCw size={14} aria-hidden="true" /> Try again</button>
          </div>
        ) : null}

        {!error ? (
          <>
            <div className="demo-stats" aria-label="Booking summary">
              <article className="demo-stat"><span>Total bookings</span><strong>{filteredBookings.length}</strong></article>
              <article className="demo-stat"><span>Confirmed</span><strong>{confirmed}</strong></article>
              <article className="demo-stat"><span>Gross booking value · sample</span><strong>{money.format(total)}</strong></article>
              <article className="demo-stat"><span>Average value · sample</span><strong>{money.format(filteredBookings.length ? total / filteredBookings.length : 0)}</strong></article>
            </div>

            <section className="demo-chart" aria-labelledby="dashboard-chart-title">
              <h2 id="dashboard-chart-title">Bookings over time · illustrative sample</h2>
              <svg viewBox="0 0 700 180" role="img" aria-label="Illustrative bookings trend chart">
                <title>Illustrative bookings trend</title>
                {[30, 75, 120, 165].map((y) => <line className="demo-chart__grid" key={y} x1="0" x2="700" y1={y} y2={y} />)}
                <path className="demo-chart__area" d="M20 142 L125 112 L230 124 L335 80 L440 96 L545 52 L680 65 L680 165 L20 165 Z" />
                <polyline className="demo-chart__line" points="20,142 125,112 230,124 335,80 440,96 545,52 680,65" />
              </svg>
            </section>

            <section className="demo-table-wrap" aria-labelledby="dashboard-table-title">
              <h2 id="dashboard-table-title">Recent bookings · fictional demo data</h2>
              <table className="demo-table">
                <thead>
                  <tr>
                    <th scope="col">Booking</th>
                    <th scope="col">Guest</th>
                    <th scope="col">Product</th>
                    <th scope="col">Region</th>
                    <th scope="col">Status</th>
                    <th scope="col" aria-sort={ascending ? 'ascending' : 'descending'}>
                      <button type="button" onClick={() => setAscending((value) => !value)}>
                        Amount <ArrowDownUp size={13} aria-hidden="true" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.guest}</td>
                      <td>{booking.product}</td>
                      <td>{booking.region}</td>
                      <td>{booking.status}</td>
                      <td>{money.format(booking.amount)}</td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 ? (
                    <tr><td colSpan="6">No sample bookings match these filters.</td></tr>
                  ) : null}
                </tbody>
              </table>
            </section>
          </>
        ) : null}
      </div>
    </DemoLayout>
  )
}
