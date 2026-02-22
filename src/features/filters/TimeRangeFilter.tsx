import { memo, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { setTimeRange } from '../../store'
import { selectFilters } from '../../store'
import { format, subDays } from 'date-fns'

function TimeRangeFilterInner() {
  const dispatch = useAppDispatch()
  const { timeRange } = useAppSelector(selectFilters)
  const defaultStart = format(subDays(new Date(), 60), "yyyy-MM-dd'T'HH:mm")
  const defaultEnd = format(new Date(), "yyyy-MM-dd'T'HH:mm")
  const start = timeRange?.[0]?.slice(0, 16) ?? defaultStart
  const end = timeRange?.[1]?.slice(0, 16) ?? defaultEnd

  const onStartChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setTimeRange([e.target.value || start, end]))
    },
    [end, start, dispatch]
  )

  const onEndChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setTimeRange([start, e.target.value || end]))
    },
    [start, end, dispatch]
  )

  return (
    <fieldset className="filter-fieldset" aria-label="Time range">
      <legend>Time range</legend>
      <div className="time-row">
        <label>
          From
          <input type="datetime-local" value={start.slice(0, 16)} onChange={onStartChange} />
        </label>
        <label>
          To
          <input type="datetime-local" value={end.slice(0, 16)} onChange={onEndChange} />
        </label>
      </div>
    </fieldset>
  )
}

export const TimeRangeFilter = memo(TimeRangeFilterInner)
