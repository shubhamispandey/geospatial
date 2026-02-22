export type ActivityType = 'construction' | 'energy' | 'transport' | 'military'

export interface ActivityPoint {
  id: string
  latitude: number
  longitude: number
  activityType: ActivityType
  confidence: number
  timestamp: string
}

export type ActivityPointUpdate = Pick<ActivityPoint, 'id'> & Partial<Pick<ActivityPoint, 'confidence' | 'timestamp'>>
