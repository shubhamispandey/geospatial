import { createSlice } from '@reduxjs/toolkit'
import type { ActivityType } from '../../types'
import { ACTIVITY_TYPES } from '../../constants'
import { DEFAULT_CONFIDENCE_RANGE, INITIAL_TIME_DAYS_AGO } from '../../constants'
import { subDays, formatISO } from 'date-fns'

function defaultLayerVisibility(): Record<string, boolean> {
  const out: Record<string, boolean> = {}
  for (const t of ACTIVITY_TYPES) {
    out[t] = true
  }
  return out
}

function defaultTimeRange(): [string, string] {
  const end = new Date()
  const start = subDays(end, INITIAL_TIME_DAYS_AGO)
  return [formatISO(start), formatISO(end)]
}

interface FiltersState {
  activityTypes: ActivityType[]
  confidenceRange: [number, number]
  timeRange: [string, string] | null
  layerVisibility: Record<string, boolean>
}

const initialState: FiltersState = {
  activityTypes: [...ACTIVITY_TYPES],
  confidenceRange: [...DEFAULT_CONFIDENCE_RANGE],
  timeRange: defaultTimeRange(),
  layerVisibility: defaultLayerVisibility(),
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActivityTypes(state, action: { payload: ActivityType[] }) {
      state.activityTypes = action.payload
    },
    setConfidenceRange(state, action: { payload: [number, number] }) {
      state.confidenceRange = action.payload
    },
    setTimeRange(state, action: { payload: [string, string] | null }) {
      state.timeRange = action.payload
    },
    toggleLayer(state, action: { payload: string }) {
      const key = action.payload
      if (key in state.layerVisibility) {
        state.layerVisibility[key] = !state.layerVisibility[key]
      }
    },
  },
})

export const { setActivityTypes, setConfidenceRange, setTimeRange, toggleLayer } = filtersSlice.actions
export default filtersSlice.reducer
