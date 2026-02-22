import { createContext } from 'react'
import type * as Cesium from 'cesium'

export type CesiumViewer = Cesium.Viewer

export const CesiumViewerContext = createContext<CesiumViewer | null>(null)
