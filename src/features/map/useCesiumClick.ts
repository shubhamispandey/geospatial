import { useEffect, useContext } from 'react'
import * as Cesium from 'cesium'
import { CesiumViewerContext } from './CesiumContext'
import { useAppDispatch } from '../../store'
import { selectEntity, setSidePanelOpen } from '../../store'

interface PickedPoint {
  __activityId?: string
}

export function useMapClick() {
  const viewer = useContext(CesiumViewerContext)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!viewer) return
    const container = viewer.container as HTMLElement
    const canvas = viewer.scene.canvas

    const onMouseClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return
      const position = new Cesium.Cartesian2(x, y)
      const picked = viewer.scene.pick(position)
      if (picked?.object && typeof (picked.object as PickedPoint).__activityId === 'string') {
        const id = (picked.object as PickedPoint).__activityId as string
        dispatch(selectEntity(id))
        dispatch(setSidePanelOpen(true))
      }
    }

    container.addEventListener('click', onMouseClick, true)
    return () => container.removeEventListener('click', onMouseClick, true)
  }, [viewer, dispatch])
}
