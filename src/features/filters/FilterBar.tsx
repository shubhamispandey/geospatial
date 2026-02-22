import { memo } from 'react'
import { ActivityTypeFilter } from './ActivityTypeFilter'
import { ConfidenceSlider } from './ConfidenceSlider'
import { TimeRangeFilter } from './TimeRangeFilter'
import { LayerToggles } from './LayerToggles'

function FilterBarInner() {
  return (
    <nav className="filter-bar" aria-label="Filters">
      <ActivityTypeFilter />
      <ConfidenceSlider />
      <TimeRangeFilter />
      <LayerToggles />
    </nav>
  )
}

export const FilterBar = memo(FilterBarInner)
