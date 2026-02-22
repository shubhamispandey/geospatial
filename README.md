# 3D Geospatial Intelligence Dashboard

A production-style 3D monitoring dashboard that visualises large numbers of simulated infrastructure activity points on a globe. Built for desktop with filtering, real-time simulation, and performance in mind.

## Overview

The app loads 25,000 programmatically generated activity points (configurable between 10k–50k), displays them on a Cesium 3D globe with colour by type and confidence, and simulates live updates every few seconds. Users can filter by activity type, confidence range, and time range, toggle layers, and click points to see details in a side panel. All state is in Redux; the map uses a single Cesium point primitive collection for scale.

## Setup

- **Node**: 20.19+ or 22.12+ recommended (current stack targets this; Node 18 may run with engine warnings).
- **Install**: `npm install`
- **Dev**: `npm run dev` then open the URL shown (e.g. http://localhost:5173).
- **Build**: `npm run build`
- **Preview build**: `npm run preview`

No API keys or env vars are required for the default Cesium ion imagery/terrain (free tier).

## Tech choices

- **React 18 + TypeScript + Vite**: Fast dev loop and type safety.
- **Redux Toolkit**: Single store, slices for data, filters, map, selection, UI; no prop drilling.
- **Cesium + Resium**: 3D globe with terrain and imagery; Resium for React bindings; points rendered via a single `PointPrimitiveCollection` for 10k–50k markers.
- **react-window**: Virtualised list in the activity panel for large filtered result sets.
- **date-fns**: Time range filter and formatting.

## State management

- **data**: Normalised `entities` (id → point) and `ids`; `setInitialData` and `applyDelta` for load and simulation.
- **filters**: Activity types, confidence range, time range, layer visibility; all filter UI dispatches here.
- **selectedEntity**: `selectedId` for the clicked point; panel shows details for this id.
- **ui**: `sidePanelOpen`, `loading`, `simulationRunning`.
- **map**: Minimal (e.g. base map choice) if needed later.

Filtering is done in selectors via `createSelector` over entities, ids, and filters so the UI only recomputes when inputs change. The map subscribes to `selectFilteredPoints` and syncs the Cesium point collection to that list.

## Performance decisions

- **Memoisation**: Filter and panel components wrapped in `React.memo`; list item data for react-window via `useMemo`; handlers with `useCallback` where passed to children.
- **Redux**: Normalised data and delta updates so simulation only patches changed points; selectors memoised to avoid redundant filtering.
- **Map**: One `PointPrimitiveCollection`; on filter or data change we sync by `removeAll` and re-adding visible points (no full viewer teardown). Point primitives are cheaper than 50k entities.
- **Virtualisation**: Activity panel list uses `react-window` so only visible rows mount.
- **Lazy loading**: Map viewer is lazy-loaded so the initial bundle is smaller and Cesium loads after first paint.

## Trade-offs

- **In-memory only**: No real backend or persistence; data is generated and updated in the client.
- **Map sync strategy**: Filter/data changes trigger a full re-sync of the point collection (remove all, add filtered set) rather than fine-grained add/remove by id. Simpler and robust for 25k; could be refined to delta sync if needed for heavier update rates.
- **Cesium bundle size**: Cesium is large; lazy-loading the map keeps the initial payload down but the map chunk is still sizable.
- **Node version**: Some deps expect Node 20+; the app may run on 18 with warnings.

## Known limitations

- No real API or WebSocket; simulation is timer-based with in-memory deltas.
- Designed for 10k–50k points; much beyond that would need clustering or server-driven streaming (see ARCHITECTURE.md).
- Desktop-first layout; usable on smaller screens but not tuned for touch.
- Cesium ion default token is used; for production you’d configure your own token and terms.
