# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

Two-package workspace (pnpm) with no shared code between them:

- `portalserver/` — Express 5 + Prisma 7 + PostgreSQL API (TypeScript ESM, `tsx watch`)
- `portalclient/` — Next.js 16 App Router + React 19 + MUI 7 + TanStack Query (Turbopack dev)

The root `package.json` only contains thin wrappers (`pnpm portalclient`, `pnpm portalserver`, etc.). Each package is installed and run from its own directory.

## Common commands

Run from the root:

```bash
pnpm install:client            # pnpm install inside portalclient
pnpm install:server            # pnpm install inside portalserver
pnpm portalclient              # next dev (port 3000)
pnpm portalserver              # tsx watch src/server.ts (PORT from env, default 3000)
pnpm build:client              # next build
```

Server-only (run from `portalserver/`):

```bash
pnpm migrate                   # prisma migrate dev --name init
pnpm client                    # prisma generate  (outputs to src/generated/prisma)
pnpm reset                     # prisma migrate reset
```

Client-only (run from `portalclient/`):

```bash
pnpm lint                      # eslint (flat config, next/core-web-vitals + next/typescript)
pnpm build
pnpm start
```

No test runner is configured in either package.

## Required env

- `portalserver/.env` — `DATABASE_URL`, `JWT_SECRET`, `PORT` (optional), `NODE_ENV` (affects cookie `secure` flag)
- `portalclient/.env` — `NEXT_PUBLIC_BASE_URL` (Axios base, pointed at the server)

The client and server both run on port 3000 by default — set `PORT` on the server before starting both.

## Server architecture

Modules live under `portalserver/src/modules/<feature>/` and follow a strict 4-file convention:

```
<feature>.route.ts        Router, wires validators + controller
<feature>.controller.ts   Thin: pulls req.body / req.userId, calls service, sendResponse
<feature>.service.ts      Business logic + Prisma queries
<feature>.validator.ts    Zod schemas; export type via z.infer<typeof X>["body"]
```

Wiring lives in `src/app.ts`. The order matters: `authMiddleware` is applied at the `app.use(...)` level for every protected route group (e.g. `/api/me`, `/api/organizations`, `/api/employees`). `/api/auth` is the only unprotected group.

Cross-cutting helpers in `src/shared/`:

- `middleware/authMiddleware.ts` — reads `accessToken` cookie, verifies JWT, sets `req.userId`. Throws `AppError(401)` for missing/invalid/expired tokens (extends `Request` via `shared/types/express.d.ts`).
- `middleware/validationHandler.ts` — wraps a Zod schema shaped like `z.object({ body: ..., params: ... })`; on success it **replaces** `req.body` and `req.params` with the parsed values, so downstream code gets typed data.
- `middleware/errorHandler.ts` — last in the chain. Specifically maps Prisma `P2002` (unique constraint) into `"{Model} with this {field} already exists"`; otherwise falls back to `err.statusCode || 500` and `err.message`. Use `AppError(message, status)` from services to surface user-facing errors.
- `utils/response.ts` — `sendResponse({ res, message, body, status? })` is the single response shape (`{ success, message, body }`). Login is the one exception: it sets the `accessToken` cookie before responding.
- `utils/prisma.ts` — singleton `prisma` client using the `@prisma/adapter-pg` adapter. Always import from here, never instantiate `PrismaClient` directly.
- `utils/Bcrypt.ts` — `hashPassword` / `comparePassword` (cost 10).

Auth flow: `POST /api/auth/login` returns the JWT in an httpOnly cookie (`config.cookieOptions`, `sameSite: lax`, `secure` in production). The client sends it back automatically because Axios is configured with `withCredentials: true` and CORS allows `http://localhost:3000` with credentials.

Prisma client is generated into `src/generated/prisma/` (gitignored). Import types from there (e.g. `import type { User } from "../../generated/prisma/client"`). Schema lives in `prisma/schema.prisma`; key models are `User` and `Organizations` (1-to-many via `userId`), with `ROLE` and `MODULES` enums.

## Client architecture

Next.js App Router with route groups separating layouts:

- `app/(main)/` — authenticated area. The group's `layout.tsx` wraps children in `AuthContextProvider` + side-nav + top app bar. Subroutes: `dashboard`, `organizations`, `settings`.
- `app/auth/` — `signin`, `signup`. Has its own `LoginsProvider` and marketing panel layout.
- `app/onboarding/` — post-signup organization setup.

Each route segment co-locates its private pieces in `_components/`, `_lib/`, `_types/` (Next.js underscore convention — not routable).

### Data layer

All HTTP goes through `src/lib/axios/index.ts`:
- Axios instance with `baseURL = NEXT_PUBLIC_BASE_URL`, `withCredentials: true`.
- A `QueryClient` singleton exported from the same file; query defaults are 5min stale / 10min gc / no refetch on focus / 1 retry. Mutations don't retry.

Don't call `axios` or `useQuery` directly in components. Use the wrapper hooks in `src/hooks/`:

- `useQueryGet<TData, TParams>({ url, params, options })` — `queryKey: [url, JSON.stringify(params)]`, surfaces network errors via `snackbarToast`.
- `useQueryPost<TData, TParams>({ options })` — accepts `{ body, params, url }` per call.
- `useQueryPatch`, `useQueryDelete` — same shape.

API responses follow `APIResponse<TBody> = { status, message, body, current_page, pages }` (`hooks/types/hooks.types.ts`). The server's `sendResponse` returns `{ success, message, body }` — note the field name mismatch (`status` vs `success`); read from `data.body` and `data.message`.

`utils/createMutationHandlers.ts` provides standardized `onSuccess`/`onError` for mutations, including automatic success/error snackbars (opt out via `hideSuccessToast`).

### Auth on the client

`context/auth-context.tsx` calls `useQueryGet({ url: "/api/me" })` on mount. While loading the initial profile it renders `<LoadingAnimation />`. Currently the redirect-on-error to `/auth/signin` is **commented out** — be aware when changing auth behavior.

`useAuth()` exposes `{ me, refetchProfile, state: { loadingProfile } }`. The provider only wraps `(main)/layout.tsx`, so don't call `useAuth` outside that route group.

Global providers in `app/layout.tsx`: `QueryClientProvider` → `AppThemeProvider` (MUI) → `SnackbarContainer` (singleton toast surface, controlled imperatively via `snackbarToast.success/error/...`).

### Components & paths

- TS path alias: `@/*` → `portalclient/src/*`.
- Shared UI lives under `src/components/` (`inputs/`, `datagrid/`, `navigation/`, `snackbar/`, etc.). The data grid wrapper is non-trivial — `useDataGrid`, `useGridData`, `useGridUrlState`, `useGridDownload`, `useGridSelection` work together.
- Side-nav config: `src/constants/routes.tsx` — array of `{ kind: "header" | "item", segment, icon }`. Adding a top-level page means adding both a route folder and a `ROUTES` entry.

## Conventions

- Prettier: 4-space indent, 120 print width (`.prettierrc` at root applies to both packages).
- ESLint (client only) disables `no-explicit-any` and `no-empty-object-type`; unused vars only warn when prefixed with `_`.
- Server is ESM (`"type": "module"`) — use `.js` extensions in relative imports if you hit resolution issues, though `tsx`/`bundler` resolution currently lets bare TS paths work.
- Never edit files under `portalserver/src/generated/` — regenerate via `pnpm client`.
