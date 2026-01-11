# Copilot Instructions for the-wild-oasis

## Project Overview
- **the-wild-oasis** is a full-stack web app for managing cabin bookings, built with React (Vite), Supabase (Postgres, Auth, Storage, Edge Functions), and styled-components.
- The app is organized by feature folders under `src/features/`, with supporting services in `src/services/` and UI components in `src/ui/`.
- Data flows from Supabase (database, storage, auth) to the frontend via service modules and React Query hooks.

## Key Architectural Patterns
- **Feature-based structure:** Each domain (cabins, bookings, authentication, etc.) has its own folder with hooks, forms, and UI logic.
- **React Query:** All data fetching/mutations use `@tanstack/react-query` for caching and state management. Hooks like `useCabins`, `useCreateCabin`, `useDeleteCabin` are the entry points.
- **Supabase Integration:**
  - `src/services/supabase.js` creates the client using Vite env vars (`.env.local`).
  - All DB/storage access is via the Supabase client. Auth tokens are required for protected actions.
  - Edge Functions (see `supabase/functions/`) are used for privileged operations (e.g., deleting cabins) and called from the frontend via fetch.
- **UI Components:** Shared UI in `src/ui/` (e.g., `Button`, `Modal`, `FormRow`).
- **Styling:** Uses `styled-components` and CSS variables for theming.

## Developer Workflows
- **Start dev server:** `npm run dev` (uses Vite)
- **Build for production:** `npm run build`
- **Lint:** `npm run lint`
- **Supabase local dev:** Use the Supabase CLI (`supabase start`, `supabase functions serve`)
- **Environment:** Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local` for local dev.

## Project-Specific Conventions
- **React Query:** Always invalidate relevant queries after mutations (see `queryClient.invalidateQueries`).
- **File Uploads:** Use `uploadFile` in `apiCabins.js` for images, which handles both public and signed URLs.
- **Edge Functions:** For destructive/privileged actions, use Edge Functions (e.g., `delete-cabin`) and call them from the frontend with the user's access token.
- **Error Handling:** Errors are surfaced via `react-hot-toast` notifications in hooks.
- **Component Naming:** Hooks are prefixed with `use`, forms with `Form`, and UI elements are in `src/ui/`.

## Integration Points
- **Supabase:**
  - Auth: Managed via Supabase, tokens accessed in service modules.
  - Storage: Images/files in the `cabin-images` bucket.
  - Edge Functions: Deployed in `supabase/functions/`, called from frontend for secure ops.
- **React Query:** All data access and mutations are wrapped in hooks for consistency and cache management.

## Examples
- To delete a cabin: `useDeleteCabin` → calls `deleteCabin` in `apiCabins.js` → calls Edge Function → updates cache.
- To create/edit a cabin: `useCreateCabin`/`useEditCabin` → `createEditCabin` in `apiCabins.js` → Supabase insert/update.

## Key Files/Folders
- `src/features/` — Feature modules (cabins, bookings, etc.)
- `src/services/` — API/service logic for Supabase
- `src/ui/` — Shared UI components
- `supabase/functions/` — Edge Functions (Deno)
- `.env.local` — Environment variables for Supabase

---

For more details, see code comments in each service/hook. When in doubt, follow the feature-based pattern and use React Query for all data access.
