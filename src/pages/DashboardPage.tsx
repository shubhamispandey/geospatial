import { memo, useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { setSidePanelOpen, setFiltersOpen } from '../store'
import { selectUISidePanelOpen, selectUIFiltersOpen } from '../store'
import { FilterBar } from '../features/filters'
import { ActivityPanel } from '../features/activity-panel'
import { MapViewer } from '../features/map'

const MOBILE_BREAKPOINT = 768

function DashboardPageInner() {
  const dispatch = useAppDispatch()
  const sidePanelOpen = useAppSelector(selectUISidePanelOpen)
  const filtersOpen = useAppSelector(selectUIFiltersOpen)
  const togglePanel = useCallback(() => dispatch(setSidePanelOpen(!sidePanelOpen)), [dispatch, sidePanelOpen])
  const toggleFilters = useCallback(() => dispatch(setFiltersOpen(!filtersOpen)), [dispatch, filtersOpen])

  useEffect(() => {
    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
    if (isMobile) {
      dispatch(setSidePanelOpen(false))
      dispatch(setFiltersOpen(false))
    }
  }, [dispatch])

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-row">
          <h1 className="dashboard-header-title">3D Geospatial Intelligence Dashboard</h1>
          <div className="dashboard-header-actions">
            <button type="button" onClick={toggleFilters} aria-expanded={filtersOpen} aria-controls="filter-bar">
              {filtersOpen ? 'Hide' : 'Show'} filters
            </button>
            <button type="button" onClick={togglePanel} aria-expanded={sidePanelOpen} aria-controls="activity-panel">
              {sidePanelOpen ? 'Hide' : 'Show'} activity list
            </button>
          </div>
        </div>
        {filtersOpen && (
          <div id="filter-bar" className="dashboard-filters-wrap" role="region" aria-label="Filters">
            <FilterBar />
          </div>
        )}
      </header>
      <main id="main-content" className="dashboard-main" tabIndex={-1}>
        <div className="dashboard-map">
          <MapViewer />
        </div>
        <ActivityPanel />
      </main>
    </div>
  )
}

export const DashboardPage = memo(DashboardPageInner)
