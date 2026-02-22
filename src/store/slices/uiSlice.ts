import { createSlice } from '@reduxjs/toolkit'

interface UIState {
  sidePanelOpen: boolean
  filtersOpen: boolean
  loading: boolean
  simulationRunning: boolean
}

const initialState: UIState = {
  sidePanelOpen: true,
  filtersOpen: true,
  loading: false,
  simulationRunning: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidePanelOpen(state, action: { payload: boolean }) {
      state.sidePanelOpen = action.payload
    },
    setFiltersOpen(state, action: { payload: boolean }) {
      state.filtersOpen = action.payload
    },
    setLoading(state, action: { payload: boolean }) {
      state.loading = action.payload
    },
    setSimulationRunning(state, action: { payload: boolean }) {
      state.simulationRunning = action.payload
    },
  },
})

export const { setSidePanelOpen, setFiltersOpen, setLoading, setSimulationRunning } = uiSlice.actions
export default uiSlice.reducer
