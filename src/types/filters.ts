import type { ActivityType } from './activity'

export interface FilterState {
  activityTypes: ActivityType[]
  confidenceRange: [number, number]
  timeRange: [string, string] | null
  layerVisibility: Record<string, boolean>
}
