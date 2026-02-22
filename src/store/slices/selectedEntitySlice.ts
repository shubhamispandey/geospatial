import { createSlice } from '@reduxjs/toolkit'

interface SelectedEntityState {
  selectedId: string | null
}

const initialState: SelectedEntityState = {
  selectedId: null,
}

const selectedEntitySlice = createSlice({
  name: 'selectedEntity',
  initialState,
  reducers: {
    selectEntity(state, action: { payload: string }) {
      state.selectedId = action.payload
    },
    clearSelection(state) {
      state.selectedId = null
    },
  },
})

export const { selectEntity, clearSelection } = selectedEntitySlice.actions
export default selectedEntitySlice.reducer
