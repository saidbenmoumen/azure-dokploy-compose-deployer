# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

Auto Deploy Service — a webhook bridge between Azure DevOps and Dokploy. On `git.push`, it deploys matching applications and creates/updates/deletes preview deployments with optional per-repository, per-branch MariaDB databases. Built on **Bun** runtime with **Hono** framework. No frontend — pure backend service.

## Commands

```bash
# Install dependencies
bun install

# Development with hot reload
bun run dev

# Tests
bun test

# Production
bun run src/index.ts

# Build Docker image (compiles to standalone binary)
docker build -t auto-deploy .
```

Tests use Bun's built-in test runner. There is no linter or formatter configured.

## Project Structure

```
src/
  index.ts                  # Hono server entry point (default export with port + fetch)
  routes/
    webhook.ts              # Dynamic application discovery and preview lifecycle
  lib/
    dokploy-client.ts       # Typed HTTP client wrapping Dokploy REST API
    database.ts             # DatabaseManager — MySQL database/user lifecycle
    utils.ts                # Pure utility functions (slugify, hash, URL/DB name generation)
    types/
      inputs/               # Auto-generated Dokploy API request types (DO NOT EDIT)
      outputs/              # Auto-generated Dokploy API response types (DO NOT EDIT)
types.ts                    # Azure DevOps webhook event type definitions (root level)
```

Files under `src/lib/types/` are **auto-generated** and start with `// Auto-generated. Do not edit.` — never modify them by hand.

## Code Style

### Formatting

- **Indentation:** Tabs (not spaces) in all hand-written source files
- **Semicolons:** Always
- **Quotes:** Double quotes (`"`) everywhere — imports, strings, all of it
- **Trailing commas:** Yes, on multi-line constructs
- **No formatter config exists** — maintain consistency manually by following existing patterns

### Imports

Order (no blank lines between groups):
1. Third-party libraries (`hono`, `bun`, `crypto`)
2. Type-only imports using `import type` syntax
3. Internal project modules (relative paths)

```ts
import { Hono } from "hono";
import type { AzureEvent } from "../../types";
import { DatabaseManager } from "../lib/database";
import { DokployClient } from "../lib/dokploy-client";
import {
	extractBranchName,
	generateDbName,
	generatePreviewUrl,
} from "../lib/utils";
```

Always use `import type { X }` as a separate statement — not inline `import { type X }`.

### Naming Conventions

| Element                  | Convention          | Example                          |
|--------------------------|---------------------|----------------------------------|
| Files and directories    | kebab-case          | `dokploy-client.ts`              |
| Variables and functions  | camelCase           | `targetApplication`, `slugify`   |
| Env var constants        | SCREAMING_SNAKE     | `DATABASE_HOST`, `DOKPLOY_URL`   |
| Classes                  | PascalCase          | `DokployClient`, `DatabaseManager` |
| Type aliases             | PascalCase          | `RouterInputs`, `AzureEvent`    |
| Interfaces               | PascalCase          | `GitPushEvent`, `RefUpdate`      |

### Functions

- **Exported utilities:** Named `function` declarations (not arrow functions)
  ```ts
  export function slugify(text: string): string { ... }
  ```
- **Callbacks and route handlers:** Arrow functions
  ```ts
  app.get("/health", (c) => { ... });
  items.find((a) => a.id === targetId);
  ```
- **Class methods:** Standard method syntax

### Types

- Use `type` for API contract types, unions, and mapped types
- Use `interface` for structured domain models (Azure event shapes)
- All Dokploy API methods use `RouterInputs["domain"]["method"]` for params and `RouterOutputs["domain"]["method"]` for return types — follow this pattern when adding new endpoints

### Exports

- **Named exports** exclusively — no default exports except `src/index.ts`
- `src/index.ts` exports the Bun server object: `export default { port, fetch }`

### Comments

- **JSDoc blocks** (`/** */`) for function documentation
- **Inline `//` comments** (lowercase, no period) for flow explanation within functions
- **Section headers** in classes: `// PROJECT`, `// APPLICATION`, `// DOMAIN`

## Error Handling Patterns

1. **Module-level fail-fast** for critical startup env vars:
   ```ts
   if (!DATABASE_HOST) throw new Error("Missing required ...");
   ```

2. **JSON error response** (not throw) for per-request validation inside route handlers:
   ```ts
   return c.json({ success: false, message: "..." });
   ```

3. **Top-level try/catch** in route handler returns `{ success, message, error }` with status 500

4. **Compensating cleanup** on partial failure — if creation steps fail midway, clean up everything that was created (database, application) in individual try/catch blocks, then re-throw:
   ```ts
   } catch (error) {
   	try { await dbManager.dropDatabase(dbName); } catch (e) { console.error(...); }
   	try { await dokploy.removeApplication({...}); } catch (e) { console.error(...); }
   	throw error;
   }
   ```

5. **Non-critical failures** are caught, logged with `console.error`, and swallowed (e.g., database drop on branch delete should not block application removal)

## Environment Variables

Accessed via `process.env.X` directly — no validation library. Two patterns:

- **Startup-critical vars** (`DATABASE_*`): checked at module level, `throw` on missing
- **Request-scoped vars** (`DOKPLOY_*`): checked inside the route handler, return JSON error

| Variable             | Description                                           |
|----------------------|-------------------------------------------------------|
| `DATABASE_HOST`      | MariaDB/MySQL host for preview database provisioning  |
| `DATABASE_USER`      | DB admin user (needs CREATE DATABASE/USER privileges) |
| `DATABASE_PASSWORD`  | DB admin password                                     |
| `DOKPLOY_URL`        | Dokploy instance base URL                             |
| `DOKPLOY_API_TOKEN`  | Dokploy API key                                       |
| `DOKPLOY_DEV_URL`    | Base domain for preview URLs                          |

## Key Patterns to Know

- **Application discovery:** Inventory all projects, then match generic Git applications by normalized repository URL and exact branch
- **Preview templates:** An exact `staging` branch application opts its repository into preview deployments
- **Preview naming:** Apps are `@{branch}`; URLs and DB names include repository, branch, and hash
- **Snapshot-diff pattern:** To find a newly duplicated application, snapshot existing IDs before duplication, then diff after
- **Preview locking:** MariaDB named locks serialize duplication for each staging template
- **Environment-driven setup:** `DATABASE_URL` and `WP_HOME` are only managed when those keys exist on the staging application
- **Database lifecycle:** Previews requesting `DATABASE_URL` get a dedicated DB/user; both are dropped on branch delete
- **Bun SQL:** Uses `new SQL({ adapter: "mysql" })` with `.unsafe()` for DDL statements
- **Logging:** `console.log` / `console.error` only — no logging library
- **All async code** uses `async/await`; `Promise.all()` for parallel operations
