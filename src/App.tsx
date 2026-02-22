import { Provider } from 'react-redux'
import { store, useAppSelector, selectUILoading } from './store'
import { DashboardPage } from './pages'
import { useInitialData, useSimulation } from './hooks'
import './App.css'

function Loader() {
  return (
    <div className="app-loader" aria-hidden="true">
      <div className="app-loader-spinner" />
      <span className="app-loader-text">Loading dashboard…</span>
    </div>
  )
}

function DashboardWithData() {
  useInitialData()
  useSimulation()
  const loading = useAppSelector(selectUILoading)
  if (loading) return <Loader />
  return <DashboardPage />
}

function App() {
  return (
    <Provider store={store}>
      <DashboardWithData />
    </Provider>
  )
}

export default App
