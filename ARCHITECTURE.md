# Architecture

## Why Cesium (and Resium)

We needed a 3D globe with terrain, camera controls (zoom, pan, tilt, rotate), and the ability to render many points above terrain. Cesium supports this out of the box and has a free tier (ion) for imagery and terrain, so no Mapbox or other paid token is required. Alternatives considered:

- **Mapbox GL JS**: Strong for 2D and limited 3D; not a full globe/terrain story.
- **Three.js**: Flexible but we’d have to build globe, terrain, and geo projection ourselves.

Cesium’s `PointPrimitiveCollection` is built for large point sets and performs better than creating one Entity per point. Resium wraps Cesium in React (Viewer, useCesium) so we can keep React in the driver’s seat and still reach the Cesium API for the point collection and click handling.

## Redux store design

- **Single store** with Redux Toolkit; no prop drilling: map, filters, panel, and list all read from the store.
- **Normalised data**: `data.entities` (id → ActivityPoint) and `data.ids` preserve order and allow O(1) lookup and O(changed) updates when applying simulation deltas.
- **Slices**: data (setInitialData, applyDelta), filters (activity types, confidence, time, layers), selectedEntity (selectedId), ui (panel, loading, simulation), map (minimal).
- **Selectors**: `selectFilteredPoints` uses `createSelector(entities, ids, filters)` and delegates to a pure `getFilteredData` so filtering is memoised and doesn’t re-run until inputs change.

## Trade-offs

- **Entities vs array**: We store normalised entities + ids so deltas can merge by id and selectors can derive filtered lists without mutating the source.
- **Primitive collection vs Entity per point**: One PointPrimitiveCollection updated from the filtered list is used instead of 50k Entity components so React and Cesium don’t pay the cost of that many nodes. We give up per-entity Resium components in exchange for a single imperative sync (removeAll + add).
- **Full sync vs delta on the map**: On any filter or data change we rebuild the visible set in the collection (remove all, add current filtered points). A delta approach (add/remove/update only changed points) would reduce work per tick but add complexity and id→primitive bookkeeping; we deferred that for the current scale.

## Performance bottlenecks and mitigations

1. **Too many entities**: Avoided by not using one Resium Entity per point; we use one PointPrimitiveCollection and sync from Redux.
2. **Full re-render of map on filter change**: The Viewer is not unmounted; only the point collection’s contents are updated. React state that drives the map is the filtered list; the Cesium viewer instance is stable.
3. **Expensive filtering**: Filtering 50k items every render would stall the UI. Filtering is done inside `createSelector` and in a pure service function so it only runs when entities, ids, or filters change, and the result is memoised.
4. **Long lists in the panel**: A flat list of thousands of items would mount too many DOM nodes. The panel uses react-window so only visible rows are rendered.
5. **Initial load**: The map (and Cesium) are lazy-loaded so the first paint can show header and filters before the heavy map bundle runs.

## Optimisations applied

- React.memo on filter components, DetailView, VirtualList, MapViewer, DashboardPage.
- useMemo for derived data (e.g. itemData for react-window).
- useCallback for handlers passed to children or to the list.
- Normalised Redux state and applyDelta for simulation (no full replace).
- Single primitive collection for all visible points; colour by type and confidence in one pass.
- Lazy-loaded map chunk.
- Virtualised activity list.

## What we’d improve with one more week

- **Delta sync on the map**: Maintain a map of id → PointPrimitive and, on applyDelta, only add new points, remove missing ones, and update changed confidence/position. Would reduce work when only a small subset changes each tick.
- **Web Worker for filtering**: Move getFilteredData into a worker so the main thread stays free during heavy filter operations.
- **LOD or clustering**: For very large sets, aggregate distant points into clusters and show detail on zoom; or reduce point size/count by distance.
- **Real WebSocket simulation**: Replace the interval with a mock WebSocket that pushes the same delta shape so the client code is ready for a real backend.
- **Accessibility**: Focus trap in the panel, “Skip to map” / “Skip to filters” links, and clearer keyboard flow.

## Why this breaks at 1M+ points

- **Memory**: 1M points × (id, lat, lng, type, confidence, timestamp) in JS and a matching number of Cesium point primitives would push browser memory and GC.
- **Main thread**: One synchronous filter over 1M items would block; building a 1M-point primitive collection each time would be slow even with batching.
- **Draw calls / GPU**: Cesium (and the GPU) can only handle so many primitives per frame before frame rate drops.
- **Mitigations at that scale**: Server-side filtering and pagination or streaming; clustering on the client; level-of-detail (show clusters when zoomed out, points when zoomed in); or moving to a custom WebGL layer that draws points in batches with a single draw call per batch.
