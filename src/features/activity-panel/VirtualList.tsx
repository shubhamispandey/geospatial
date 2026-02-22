import { memo, useMemo } from 'react'
import { FixedSizeList as List } from 'react-window'
import type { ActivityPoint } from '../../types'
import { ACTIVITY_TYPE_LABELS } from '../../constants'
import { format } from 'date-fns'

interface RowProps {
  index: number
  style: React.CSSProperties
  data: { points: ActivityPoint[]; onSelect: (id: string) => void }
}

const Row = memo(function Row({ index, style, data }: RowProps) {
  const { points, onSelect } = data
  const p = points[index]
  if (!p) return null
  return (
    <div style={style} className="virtual-list-row">
      <button
        type="button"
        className="virtual-list-row-btn"
        onClick={() => onSelect(p.id)}
      >
        <span className="virtual-list-id">{p.id}</span>
        <span className="virtual-list-type">{ACTIVITY_TYPE_LABELS[p.activityType]}</span>
        <span className="virtual-list-conf">{(p.confidence * 100).toFixed(0)}%</span>
        <span className="virtual-list-time">{format(new Date(p.timestamp), 'PP')}</span>
      </button>
    </div>
  )
})

interface VirtualListProps {
  points: ActivityPoint[]
  onSelect: (id: string) => void
  height: number
}

function VirtualListInner({ points, onSelect, height }: VirtualListProps) {
  const itemData = useMemo(
    () => ({ points, onSelect }),
    [points, onSelect]
  )

  return (
    <List
      height={height}
      itemCount={points.length}
      itemSize={44}
      width="100%"
      itemData={itemData}
    >
      {Row}
    </List>
  )
}

export const VirtualList = memo(VirtualListInner)
