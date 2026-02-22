import { memo, useRef, useEffect, useState } from 'react'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { CesiumViewerContext } from './CesiumContext'
import { MarkersLayer } from './MarkersLayer'

function MapViewerInner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewer, setViewer] = useState<Cesium.Viewer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const v = new Cesium.Viewer(containerRef.current, {
      terrainProvider: undefined,
      animation: false,
      baseLayerPicker: true,
      geocoder: false,
      homeButton: true,
      sceneModePicker: true,
      timeline: false,
      navigationHelpButton: true,
    })
    setViewer(v)
    return () => {
      v.destroy()
      setViewer(null)
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }} ref={containerRef}>
      {viewer && (
        <CesiumViewerContext.Provider value={viewer}>
          <MarkersLayer />
        </CesiumViewerContext.Provider>
      )}
    </div>
  )
}

export const MapViewer = memo(MapViewerInner)
