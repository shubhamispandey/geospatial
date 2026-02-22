import { memo, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { toggleLayer } from '../../store'
import { selectFilters } from '../../store'
import { ACTIVITY_TYPES, ACTIVITY_TYPE_LABELS } from '../../constants'

function LayerTogglesInner() {
  const dispatch = useAppDispatch()
  const { layerVisibility } = useAppSelector(selectFilters)

  const onToggle = useCallback(
    (key: string) => () => dispatch(toggleLayer(key)),
    [dispatch]
  )

  return (
    <fieldset className="filter-fieldset" aria-label="Layers">
      <legend>Layers</legend>
      {ACTIVITY_TYPES.map((type) => (
        <label key={type} className="filter-checkbox">
          <input
            type="checkbox"
            checked={layerVisibility[type] !== false}
            onChange={onToggle(type)}
            aria-label={`Toggle ${ACTIVITY_TYPE_LABELS[type]} layer`}
          />
          <span>{ACTIVITY_TYPE_LABELS[type]}</span>
        </label>
      ))}
    </fieldset>
  )
}

export const LayerToggles = memo(LayerTogglesInner)
