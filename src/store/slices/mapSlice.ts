import { createSlice } from '@reduxjs/toolkit'

interface MapState {
  selectedBaseMap?: string
}

const initialState: MapState = {}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setBaseMap(_, action: { payload: string }) {
      return { selectedBaseMap: action.payload }
    },
  },
})

export const { setBaseMap } = mapSlice.actions
export default mapSlice.reducer
