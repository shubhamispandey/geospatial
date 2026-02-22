import { useEffect, useRef } from 'react'
import { useAppDispatch } from '../store'
import { setInitialData, setLoading } from '../store'
import { createInitialDataset } from '../services'

const INITIAL_COUNT = 25000

export function useInitialData() {
  const dispatch = useAppDispatch()
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true
    dispatch(setLoading(true))
    const data = createInitialDataset(INITIAL_COUNT)
    dispatch(setInitialData(data))
    dispatch(setLoading(false))
  }, [dispatch])
}
