import { memo } from 'react'
import type { ActivityPoint } from '../../types'
import { ACTIVITY_TYPE_LABELS } from '../../constants'
import { format } from 'date-fns'

interface DetailViewProps {
  point: ActivityPoint | null
  onClose: () => void
}

function DetailViewInner({ point, onClose }: DetailViewProps) {
  if (!point) {
    return (
      <section className="detail-view detail-view-empty" aria-label="Activity details">
        <p className="detail-view-hint">Click any point on the map to see its details here.</p>
      </section>
    )
  }

  return (
    <section className="detail-view" aria-label="Activity details">
      <header className="detail-header">
        <h2>Activity details</h2>
        <button type="button" onClick={onClose} aria-label="Close panel">
          Close
        </button>
      </header>
      <dl className="detail-list">
        <dt>ID</dt>
        <dd>{point.id}</dd>
        <dt>Type</dt>
        <dd>{ACTIVITY_TYPE_LABELS[point.activityType]}</dd>
        <dt>Confidence</dt>
        <dd>{(point.confidence * 100).toFixed(1)}%</dd>
        <dt>Latitude</dt>
        <dd>{point.latitude.toFixed(5)}</dd>
        <dt>Longitude</dt>
        <dd>{point.longitude.toFixed(5)}</dd>
        <dt>Timestamp</dt>
        <dd>{format(new Date(point.timestamp), 'PPpp')}</dd>
      </dl>
    </section>
  )
}

export const DetailView = memo(DetailViewInner)
