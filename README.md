# App Graph Builder

Responsive ReactFlow canvas assignment implementation for building and inspecting an application graph.

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate or refresh the MSW service worker:

   ```bash
   npx msw init public/ --save
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Useful checks:

   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

No environment variables are required.

## Key Decisions

- TanStack Query owns server data for `/apps` and `/apps/:id/graph`; Zustand only stores UI selection and panel state.
- ReactFlow nodes and edges are edited by writing back into the selected graph query cache, keeping inspector edits and canvas state in one place.
- MSW handlers live in `src/mocks/handlers.ts` and simulate latency plus occasional graph failures.
- The service cards use a custom ReactFlow node type so status, cost, metrics, slider value, handles, and AWS marker match the assignment surface.
- shadcn-style primitives are implemented locally under `src/components/ui` to keep the project non-interactive and easy to run from a fresh clone.

## Known Limitations

- There is no real backend or persistence beyond the current browser session.
- The mock graph data is generated locally for each app and is intentionally small.
- The mobile drawer is implemented with CSS breakpoints and should be tested in the target browser/device matrix before production use.
- The theme/action buttons in the top bar are placeholders except for Fit View.

## Assignment Coverage

- Top bar, left rail, responsive right panel, app list, and node inspector.
- Dotted ReactFlow canvas with custom draggable service nodes and connected edges.
- Node selection, Delete/Backspace removal, zoom, pan, Fit View, and `F`/`Escape` shortcuts.
- Config and Runtime inspector tabs backed by Zustand.
- Editable node name, synced slider and numeric input, notes textarea, and status badge.
- Strict TypeScript config, ESLint config, required npm scripts, TanStack Query hooks, Zustand store, and MSW mock handlers.
