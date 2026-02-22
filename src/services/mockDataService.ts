import type { ActivityPoint } from '../types'
import type { FilterState } from '../types'
import { generateMockData } from '../utils'
import { isWithinInterval, parseISO } from 'date-fns'

export function getFilteredData(
  entities: Record<string, ActivityPoint>,
  ids: string[],
  filters: FilterState
): ActivityPoint[] {
  const [confMin, confMax] = filters.confidenceRange
  const typeSet = new Set(filters.activityTypes)
  const hasTypeFilter = typeSet.size > 0
  const [timeStart, timeEnd] = filters.timeRange ?? [null, null]
  const hasTimeFilter = timeStart != null && timeEnd != null

  const out: ActivityPoint[] = []
  for (const id of ids) {
    const p = entities[id]
    if (!p) continue
    if (hasTypeFilter && !typeSet.has(p.activityType)) continue
    if (p.confidence < confMin || p.confidence > confMax) continue
    if (hasTimeFilter) {
      try {
        const t = parseISO(p.timestamp)
        const start = parseISO(timeStart)
        const end = parseISO(timeEnd)
        if (!isWithinInterval(t, { start, end })) continue
      } catch {
        continue
      }
    }
    const layerKey = p.activityType
    if (filters.layerVisibility[layerKey] === false) continue
    out.push(p)
  }
  return out
}

export function createInitialDataset(count: number): ActivityPoint[] {
  return generateMockData(count)
}
