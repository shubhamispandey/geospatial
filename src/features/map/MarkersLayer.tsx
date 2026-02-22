import { useEffect, memo, useContext } from 'react'
import * as Cesium from 'cesium'
import { CesiumViewerContext } from './CesiumContext'
import { useAppSelector } from '../../store'
import { selectFilteredPoints, selectSelectedId } from '../../store'
import { activityTypeAndConfidenceToRgb, rgbToCesiumColor } from '../../constants/colors'

const HEIGHT_OFFSET = 120
const PIXEL_SIZE = 12
const OUTLINE_WIDTH = 2
const SELECTED_PIXEL_SIZE = 18
const SELECTED_OUTLINE_WIDTH = 3

export const pointCollectionRef: { current: Cesium.PointPrimitiveCollection | null } = { current: null }

function MarkersLayerInner() {
  const viewer = useContext(CesiumViewerContext)
  const points = useAppSelector(selectFilteredPoints)
  const selectedId = useAppSelector(selectSelectedId)

  useEffect(() => {
    if (!viewer?.scene?.primitives) return
    const collection = new Cesium.PointPrimitiveCollection()
    viewer.scene.primitives.add(collection)
    pointCollectionRef.current = collection
    return () => {
      viewer.scene.primitives.remove(collection)
      pointCollectionRef.current = null
    }
  }, [viewer])

  useEffect(() => {
    const collection = pointCollectionRef.current
    if (!collection || !viewer) return
    collection.removeAll()
    const ellipsoid = Cesium.Ellipsoid.WGS84
    const outlineColor = new Cesium.Color(1, 1, 1, 0.95)
    const selectedOutlineColor = new Cesium.Color(1, 1, 0, 1)
    const scaleByDistance = new Cesium.NearFarScalar(1e5, 1.4, 1e7, 0.35)

    for (const p of points) {
      const position = Cesium.Cartesian3.fromDegrees(
        p.longitude,
        p.latitude,
        HEIGHT_OFFSET,
        ellipsoid
      )
      const rgb = activityTypeAndConfidenceToRgb(p.activityType, p.confidence)
      const color = rgbToCesiumColor(rgb, 0.95)
      const isSelected = p.id === selectedId
      collection.add({
        position,
        color: new Cesium.Color(color.red, color.green, color.blue, color.alpha),
        pixelSize: isSelected ? SELECTED_PIXEL_SIZE : PIXEL_SIZE,
        outlineColor: isSelected ? selectedOutlineColor : outlineColor,
        outlineWidth: isSelected ? SELECTED_OUTLINE_WIDTH : OUTLINE_WIDTH,
        scaleByDistance,
      })
    }
  }, [points, viewer, selectedId])

  return null
}

export const MarkersLayer = memo(MarkersLayerInner)
