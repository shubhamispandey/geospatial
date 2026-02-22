import type { ActivityType } from '../types'

export const ACTIVITY_TYPES: ActivityType[] = ['construction', 'energy', 'transport', 'military']

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  construction: 'Construction',
  energy: 'Energy',
  transport: 'Transport',
  military: 'Military',
}
