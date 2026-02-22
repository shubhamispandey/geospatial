import type { ActivityPoint, ActivityType } from '../types'

const CATEGORIES: ActivityType[] = ['construction', 'energy', 'transport', 'military']

export function generateMockData(count: number, idOffset = 0): ActivityPoint[] {
  return Array.from({ length: count }, (_, i) => {
    const idx = idOffset + i
    return {
      id: `event-${idx}`,
      latitude: 20 + Math.random() * 20,
      longitude: 70 + Math.random() * 20,
      activityType: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)] as ActivityType,
      confidence: Math.random(),
      timestamp: new Date(
        Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 60
      ).toISOString(),
    }
  })
}
