import { useEffect, useRef } from 'react'
import { useAppDispatch, store } from '../store'
import { applyDelta, setSimulationRunning } from '../store'
import { startSimulation } from '../services'

export function useSimulation() {
  const dispatch = useAppDispatch()
  const stopRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    dispatch(setSimulationRunning(true))
    stopRef.current = startSimulation(
      () => store.getState().data.ids,
      () => store.getState().data.nextIdOffset,
      (delta) => dispatch(applyDelta(delta))
    )
    return () => {
      if (stopRef.current) {
        stopRef.current()
        stopRef.current = null
      }
      dispatch(setSimulationRunning(false))
    }
  }, [dispatch])
}
