import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { getFilteredData } from '../services'

export const selectDataEntities = (state: RootState) => state.data.entities
export const selectDataIds = (state: RootState) => state.data.ids
export const selectNextIdOffset = (state: RootState) => state.data.nextIdOffset
export const selectFilters = (state: RootState) => state.filters
export const selectSelectedId = (state: RootState) => state.selectedEntity.selectedId
export const selectUISidePanelOpen = (state: RootState) => state.ui.sidePanelOpen
export const selectUIFiltersOpen = (state: RootState) => state.ui.filtersOpen
export const selectUILoading = (state: RootState) => state.ui.loading
export const selectUISimulationRunning = (state: RootState) => state.ui.simulationRunning

export const selectFilteredPoints = createSelector(
  [selectDataEntities, selectDataIds, selectFilters],
  (entities, ids, filters) => getFilteredData(entities, ids, filters)
)

export const selectFilteredPointIds = createSelector(
  [selectFilteredPoints],
  (points) => points.map((p) => p.id)
)

export const selectPointById = (state: RootState, id: string | null) => {
  if (id == null) return null
  return state.data.entities[id] ?? null
}
