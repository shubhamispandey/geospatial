import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './slices/dataSlice'
import filtersReducer from './slices/filtersSlice'
import mapReducer from './slices/mapSlice'
import selectedEntityReducer from './slices/selectedEntitySlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    data: dataReducer,
    filters: filtersReducer,
    map: mapReducer,
    selectedEntity: selectedEntityReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 128,
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
