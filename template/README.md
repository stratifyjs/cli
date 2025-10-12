# Stratify App (Tasks)

Generated with `@stratify/cli`.

## Scripts
- `npm run dev` — run with tsx
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run compiled app
- `npm test` — run integration tests with tsx

## Structure
- `src/main.ts` — app entrypoint
- `src/tasks` — domain components
  - `tasks.module.ts` — module composition
  - `providers/tasks-repository.provider.ts` — fake in-memory repository
  - `controllers/tasks.controller.ts` — routes (GET/POST)
  - `hooks/http.hooks.ts` — trivial HTTP hook
  - `installers/cors.installer.ts` — enables CORS
  - `adapters/version.adapter.ts` — exposes fastify.version
- `test/tasks.integration.test.ts` — integration tests for tasks endpoints
