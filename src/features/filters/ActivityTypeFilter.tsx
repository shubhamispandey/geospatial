import { memo, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { setActivityTypes } from '../../store'
import { selectFilters } from '../../store'
import { ACTIVITY_TYPES, ACTIVITY_TYPE_LABELS } from '../../constants'
import type { ActivityType } from '../../types'

function ActivityTypeFilterInner() {
  const dispatch = useAppDispatch()
  const { activityTypes } = useAppSelector(selectFilters)

  const toggle = useCallback(
    (type: ActivityType) => {
      const set = new Set(activityTypes)
      if (set.has(type)) set.delete(type)
      else set.add(type)
      dispatch(setActivityTypes(Array.from(set)))
    },
    [activityTypes, dispatch]
  )

  return (
    <fieldset className="filter-fieldset" aria-label="Activity type">
      <legend>Activity type</legend>
      {ACTIVITY_TYPES.map((type) => (
        <label key={type} className="filter-checkbox">
          <input
            type="checkbox"
            checked={activityTypes.includes(type)}
            onChange={() => toggle(type)}
            aria-label={ACTIVITY_TYPE_LABELS[type]}
          />
          <span>{ACTIVITY_TYPE_LABELS[type]}</span>
        </label>
      ))}
    </fieldset>
  )
}

export const ActivityTypeFilter = memo(ActivityTypeFilterInner)
