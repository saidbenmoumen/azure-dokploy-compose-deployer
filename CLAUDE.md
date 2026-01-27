# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Auto Deploy Service - A webhook bridge between Azure DevOps and Dokploy that creates preview deployments for branches. When code is pushed, it duplicates a template compose project in Dokploy with a unique preview URL.

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
2. `webhook.ts` parses the event and identifies branch/action
3. For new branches: duplicates template compose → updates config → creates domain → deploys
4. For existing branches: triggers redeploy
5. For deleted branches (objectId all zeros): removes the compose

### Key Components

- **`src/index.ts`** - Hono server setup, routes `/health` and delegates `/webhook/*`
- **`src/routes/webhook.ts`** - Main webhook handler with all preview deployment logic
- **`src/lib/dokploy-client.ts`** - Typed API client wrapping Dokploy REST endpoints
- **`src/lib/utils.ts`** - Branch name utilities: `slugify`, `hash`, `extractBranchName`, `generatePreviewUrl`
- **`events.ts`** - Azure DevOps webhook type definitions derived from real payloads

### Preview Naming Convention

Composes are named `@{branch}` (e.g., `@feature/new-login`). Preview URLs follow `{slug}-{8-char-hash}.${dev_url}`.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DOKPLOY_URL` | Dokploy instance base URL |
| `DOKPLOY_API_TOKEN` | API key with project/compose/domain permissions |
| `DOKPLOY_DEV_URL` | Base domain for preview URLs (e.g., `dev.example.com` → previews at `{slug}-{hash}.dev.example.com`) | 
| `PROJECT_ID` | Source project containing the template |
| `ENVIRONMENT_ID` | Environment within the project |
| `COMPOSE_ID` | Template compose to duplicate |

### Dokploy API Endpoints Used

- `project.one`, `project.duplicate` - Fetch/clone projects
- `compose.update`, `compose.deploy`, `compose.delete` - Manage compose lifecycle
- `domain.create`, `domain.delete`, `domain.byComposeId` - Manage domains
