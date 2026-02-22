import { memo, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  selectSelectedId,
  selectPointById,
  selectFilteredPoints,
  selectUISidePanelOpen,
  clearSelection,
  setSidePanelOpen,
  selectEntity,
} from '../../store'
import { DetailView } from './DetailView'
import { VirtualList } from './VirtualList'

const LIST_HEIGHT = 280

function ActivityPanelInner() {
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector(selectSelectedId)
  const point = useAppSelector((state) => selectPointById(state, selectedId))
  const filteredPoints = useAppSelector(selectFilteredPoints)
  const sidePanelOpen = useAppSelector(selectUISidePanelOpen)

  const onClose = useCallback(() => {
    dispatch(clearSelection())
    dispatch(setSidePanelOpen(false))
  }, [dispatch])

  const onSelect = useCallback(
    (id: string) => {
      dispatch(selectEntity(id))
      dispatch(setSidePanelOpen(true))
    },
    [dispatch]
  )

  const isOpen = sidePanelOpen || selectedId != null
  if (!isOpen) return null

  return (
    <aside id="activity-panel" className="activity-panel" aria-label="Activity panel">
      <div className="activity-panel-close-bar">
        <button type="button" onClick={onClose} className="activity-panel-close-btn" aria-label="Close panel">
          Close
        </button>
      </div>
      <DetailView point={point} onClose={onClose} />
      <div className="activity-panel-list">
        <h3>Filtered results ({filteredPoints.length})</h3>
        <VirtualList points={filteredPoints} onSelect={onSelect} height={LIST_HEIGHT} />
      </div>
    </aside>
  )
}

export const ActivityPanel = memo(ActivityPanelInner)
