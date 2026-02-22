import type { DataDelta } from '../types'
import { generateMockData } from '../utils'

const SIMULATION_INTERVAL_MS = 4000
const ADD_BATCH_SIZE = 10
const UPDATE_SUBSET_SIZE = 50

export function startSimulation(
  getIds: () => string[],
  getNextIdOffset: () => number,
  onDelta: (delta: DataDelta) => void
): () => void {
  let tick: ReturnType<typeof setInterval> | null = null

  tick = setInterval(() => {
    const ids = getIds()
    const added = generateMockData(ADD_BATCH_SIZE, getNextIdOffset())
    const updated: DataDelta['updated'] = []
    const pool = ids.length > UPDATE_SUBSET_SIZE ? sampleIds(ids, UPDATE_SUBSET_SIZE) : ids
    for (const id of pool) {
      updated.push({
        id,
        confidence: Math.random(),
        timestamp: new Date().toISOString(),
      })
    }
    onDelta({ added, updated })
  }, SIMULATION_INTERVAL_MS)

  return () => {
    if (tick != null) clearInterval(tick)
  }
}

function sampleIds(ids: string[], k: number): string[] {
  const result: string[] = []
  const n = ids.length
  for (let i = 0; i < k; i++) {
    const idx = Math.floor(Math.random() * n)
    result.push(ids[idx])
  }
  return result
}
