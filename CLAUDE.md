# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Auto Deploy Service - A webhook bridge between Azure DevOps and Dokploy that deploys every application matching a pushed repository and branch. For new branches, it discovers and duplicates that repository's `staging` application with a unique preview URL and an optional database.

## Commands

```bash
# Development (hot reload)
bun run dev

# Production
bun run src/index.ts

# Install dependencies
bun install

# Build Docker image
docker build -t auto-deploy .
```

## Architecture

### Request Flow

1. Azure DevOps sends `git.push` webhook to `/webhook/azure`
2. `webhook.ts` inventories applications across all Dokploy projects
3. For existing branches: deploys every repository and branch match
4. For new branches: duplicates the matching repository's `staging` application → conditionally updates `DATABASE_URL`/`WP_HOME` → creates domain → deploys
5. For deleted branches (objectId all zeros): removes managed preview applications and databases

### Key Components

- **`src/index.ts`** - Hono server setup, routes `/health` and delegates `/webhook/*`
- **`src/routes/webhook.ts`** - Main webhook handler with all preview deployment logic
- **`src/lib/dokploy-client.ts`** - Typed API client wrapping Dokploy REST endpoints
- **`src/lib/utils.ts`** - Branch name utilities: `slugify`, `hash`, `extractBranchName`, `generatePreviewUrl`
- **`types.ts`** - Azure DevOps webhook type definitions derived from real payloads

### Preview Naming Convention

Applications are named `@{branch}` (e.g., `@feature/new-login`). Preview URLs and databases include the repository and branch with an 8-character hash.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DOKPLOY_URL` | Dokploy instance base URL |
| `DOKPLOY_API_TOKEN` | API key with project/application/domain permissions |
| `DOKPLOY_DEV_URL` | Base domain for repository-scoped preview URLs |
| `DATABASE_HOST` | MariaDB host used for preview database provisioning |
| `DATABASE_USER` | MariaDB administrative user |
| `DATABASE_PASSWORD` | MariaDB administrative password |

### Dokploy API Endpoints Used

- `project.all`, `project.one`, `project.duplicate` - Discover and clone applications
- `application.update`, `application.deploy`, `application.delete` - Manage application lifecycle
- `domain.create`, `domain.delete`, `domain.byApplicationId` - Manage domains
