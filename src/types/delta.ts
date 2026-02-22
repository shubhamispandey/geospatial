import type { ActivityPoint, ActivityPointUpdate } from './activity'

export interface DataDelta {
  added: ActivityPoint[]
  updated: ActivityPointUpdate[]
}
