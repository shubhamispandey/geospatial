import { createSlice } from '@reduxjs/toolkit'
import type { ActivityPoint, DataDelta } from '../../types'

interface DataState {
  entities: Record<string, ActivityPoint>
  ids: string[]
  nextIdOffset: number
}

const initialState: DataState = {
  entities: {},
  ids: [],
  nextIdOffset: 0,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setInitialData(state, action: { payload: ActivityPoint[] }) {
      const list = action.payload
      state.entities = {}
      state.ids = []
      state.nextIdOffset = list.length
      for (const p of list) {
        state.entities[p.id] = p
        state.ids.push(p.id)
      }
    },
    applyDelta(state, action: { payload: DataDelta }) {
      const { added, updated } = action.payload
      for (const p of added) {
        if (state.entities[p.id]) continue
        state.entities[p.id] = p
        state.ids.push(p.id)
      }
      state.nextIdOffset += added.length
      for (const u of updated) {
        const e = state.entities[u.id]
        if (!e) continue
        if (u.confidence !== undefined) e.confidence = u.confidence
        if (u.timestamp !== undefined) e.timestamp = u.timestamp
      }
    },
  },
})

export const { setInitialData, applyDelta } = dataSlice.actions
export default dataSlice.reducer
