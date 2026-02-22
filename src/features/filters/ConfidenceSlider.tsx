import { memo, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { setConfidenceRange } from '../../store'
import { selectFilters } from '../../store'

function ConfidenceSliderInner() {
  const dispatch = useAppDispatch()
  const { confidenceRange } = useAppSelector(selectFilters)
  const [min, max] = confidenceRange

  const onMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value)
      dispatch(setConfidenceRange([v, max]))
    },
    [max, dispatch]
  )

  const onMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value)
      dispatch(setConfidenceRange([min, v]))
    },
    [min, dispatch]
  )

  return (
    <fieldset className="filter-fieldset" aria-label="Confidence range">
      <legend>Confidence</legend>
      <div className="slider-row">
        <label>
          <span className="sr-only">Min confidence</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={min}
            onChange={onMinChange}
            aria-valuemin={0}
            aria-valuemax={1}
            aria-valuenow={min}
          />
          <span className="slider-value">{min.toFixed(2)}</span>
        </label>
        <label>
          <span className="sr-only">Max confidence</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={max}
            onChange={onMaxChange}
            aria-valuemin={0}
            aria-valuemax={1}
            aria-valuenow={max}
          />
          <span className="slider-value">{max.toFixed(2)}</span>
        </label>
      </div>
    </fieldset>
  )
}

export const ConfidenceSlider = memo(ConfidenceSliderInner)
