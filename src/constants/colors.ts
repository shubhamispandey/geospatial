import type { ActivityType } from '../types'

const CONFIDENCE_LOW = [255, 60, 60]
const CONFIDENCE_HIGH = [50, 255, 90]

export function confidenceToRgb(confidence: number): [number, number, number] {
  const t = Math.max(0, Math.min(1, confidence))
  return [
    Math.round(CONFIDENCE_LOW[0] + (CONFIDENCE_HIGH[0] - CONFIDENCE_LOW[0]) * t),
    Math.round(CONFIDENCE_LOW[1] + (CONFIDENCE_HIGH[1] - CONFIDENCE_LOW[1]) * t),
    Math.round(CONFIDENCE_LOW[2] + (CONFIDENCE_HIGH[2] - CONFIDENCE_LOW[2]) * t),
  ]
}

export function rgbToCesiumColor(rgb: [number, number, number], alpha = 1): { red: number; green: number; blue: number; alpha: number } {
  return {
    red: rgb[0] / 255,
    green: rgb[1] / 255,
    blue: rgb[2] / 255,
    alpha,
  }
}

const TYPE_BASE: Record<ActivityType, [number, number, number]> = {
  construction: [255, 165, 0],
  energy: [0, 180, 255],
  transport: [0, 220, 100],
  military: [255, 60, 100],
}

export function activityTypeToRgb(type: ActivityType): [number, number, number] {
  return TYPE_BASE[type]
}

export function activityTypeAndConfidenceToRgb(type: ActivityType, confidence: number): [number, number, number] {
  const base = activityTypeToRgb(type)
  const conf = confidenceToRgb(confidence)
  return [
    Math.round(base[0] * 0.6 + conf[0] * 0.4),
    Math.round(base[1] * 0.6 + conf[1] * 0.4),
    Math.round(base[2] * 0.6 + conf[2] * 0.4),
  ]
}
