# Azure Dokploy Auto Deployer

A Bun/Hono webhook service that connects Azure DevOps Git pushes to Dokploy. It discovers applications dynamically across the Dokploy organization, deploys every enabled application matching the pushed repository and branch, and manages temporary preview applications for feature branches.

No Dokploy project, environment, or application IDs are configured. Applications are discovered from their Git source configuration.

## Features

- Discovers applications across all accessible Dokploy projects and environments.
- Matches Azure HTTPS and SSH repository URLs safely.
- Deploys every application matching the repository and exact branch.
- Respects Dokploy's **Auto Deploy** switch for deployment triggers.
- Supports applications assigned to the local Dokploy host or remote deployment servers.
- Uses an enabled `staging` application as the preview template for each repository.
- Creates repository-scoped preview domains.
- Optionally provisions a dedicated MariaDB database and user per preview.
- Optionally updates `WP_HOME` for preview-aware applications.
- Removes managed preview applications and databases when branches are deleted.
- Serializes preview duplication with MariaDB named locks.
- Cleans up partially created resources when preview setup fails.

## How It Works

Azure DevOps sends a `git.push` event to:

```text
POST /webhook/azure
```

For each event, the service:

1. Extracts the Azure repository and first branch ref update.
2. Calls Dokploy `project.all` to discover accessible project, environment, and application IDs.
3. Calls `application.one` for each application to read its complete source settings, Auto Deploy flag, and environment.
4. Normalizes the Azure and Dokploy Git URLs and finds repository matches.
5. Finds applications configured for the exact pushed branch.
6. Deploys matching applications whose `autoDeploy` value is `true`.
7. If no branch application exists, checks whether the repository has an enabled `staging` template.
8. For eligible feature branches, duplicates staging, configures the preview, and deploys it.
9. For deleted branches, removes managed preview resources.

### Behavior Matrix

| Event state | Result |
|---|---|
| Matching repository and branch applications exist | Deploy every match with `autoDeploy === true` |
| Matches exist but all have Auto Deploy disabled | Return success without triggering a deployment |
| Some matches are enabled and some disabled | Deploy enabled matches and skip disabled matches |
| New feature branch with one enabled `staging` app | Create and deploy a preview |
| New feature branch without `staging` | Skip preview creation |
| New feature branch with disabled `staging` | Skip preview creation |
| New protected branch without an application | Skip preview creation |
| Deleted preview branch | Remove managed preview apps and their managed databases |
| Deleted protected branch | Never remove applications |

Disabled branch applications still count as existing. This prevents the service from creating a replacement preview merely because Auto Deploy is disabled.

## Dokploy Setup

### 1. Configure Generic Git Applications

Azure repositories must be configured in Dokploy as **Git** applications (`sourceType: "git"`). The service reads:

- `customGitUrl` for repository identity.
- `customGitBranch` for exact branch identity.
- `autoDeploy` to decide whether deployment may be triggered.

Repository names alone are never used for matching. This prevents repositories with identical names in different Azure organizations or projects from colliding.

The URL normalizer understands common Azure forms:

```text
https://dev.azure.com/{organization}/{project}/_git/{repository}
https://{organization}.visualstudio.com/{project}/_git/{repository}
git@ssh.dev.azure.com:v3/{organization}/{project}/{repository}
ssh://git@ssh.dev.azure.com/v3/{organization}/{project}/{repository}
```

HTTPS credentials embedded in clone URLs are ignored for identity comparison and are not logged.

### 2. Enable Auto Deploy Where Needed

The Dokploy **Auto Deploy** switch is authoritative:

- `true`: this service may trigger deployment.
- `false` or `null`: deployment is skipped.

This works independently for multiple applications using the same repository and branch. For example, LIVE and STANDBY can both deploy from `main`, or one can be disabled without affecting the other.

Branch deletion still removes auto-created previews when Auto Deploy has been disabled later. This avoids orphaned preview applications and databases.

### 3. Add a Staging Template for Previews

A repository supports automatic previews only when it has exactly one application whose branch is exactly:

```text
staging
```

The staging application must also have Auto Deploy enabled.

When a new feature branch is pushed, the service duplicates that application in the same Dokploy project and environment. Dokploy preserves the staging application's deployment-server assignment, so previews run on the same local or remote server as staging.

The duplicated application is renamed to:

```text
@{branch}
```

Examples:

```text
@feature/new-checkout
@bugfix/payment-timeout
```

The staging application is a real template: its source settings, build settings, environment, ports, mounts, security rules, and other duplicated configuration can affect previews. Review persistent mounts and external-service credentials carefully so previews do not unintentionally share staging state.

### 4. Configure Preview Domains

Set `DOKPLOY_DEV_URL` to the base domain used by previews, without a scheme:

```text
DOKPLOY_DEV_URL=dev.example.com
```

Generated hosts use a repository name, branch slug, and stable hash:

```text
{repository}-{branch}-{hash}.dev.example.com
```

The hash includes the Azure repository ID and exact branch, preventing identical branch names in different repositories from colliding.

Configure wildcard DNS for the preview base domain so it resolves to the deployment server used by staging:

```text
*.dev.example.com
```

The service removes domains copied from staging and creates one HTTPS domain using Let's Encrypt on port `80`.

### 5. Opt Into Preview Environment Overrides

Environment setup is driven by keys present on the staging application's own environment string.

#### Dedicated MariaDB Database

To request a dedicated database for every preview, include `DATABASE_URL` on staging. Its value may be a placeholder:

```dotenv
DATABASE_URL=
```

or:

```dotenv
DATABASE_URL=${{project.DATABASE_URL}}
```

For each preview, the service will:

1. Create a repository-and-branch-specific MariaDB database.
2. Create a random dedicated database user.
3. Grant that user access only to the preview database.
4. Replace `DATABASE_URL` with a `mariadb://` connection URL.
5. Drop the database and dedicated user when the branch is deleted.

If `DATABASE_URL` is absent from staging, no database is created and the key is not added.

#### Preview Home URL

To update an application's public URL, include `WP_HOME` on staging:

```dotenv
WP_HOME=
```

The value is replaced with the generated HTTPS preview URL. If `WP_HOME` is absent, it is not added or modified.

These two keys are independent. An application can request both, either one, or neither.

## Protected Branches

The following branch names never create previews and are never automatically deleted:

```text
staging
production
prod
main
master
dev
```

The repository's Azure default branch is also protected, even when it has another name such as `trunk`.

Protected applications still deploy normally when a matching application exists and Auto Deploy is enabled.

## Configuration

Create a `.env` file from `.env.example`:

```dotenv
# HTTP server
PORT=3000

# Dokploy API base URL and API key
DOKPLOY_URL=https://dokploy.example.com/api
DOKPLOY_API_TOKEN=your-dokploy-api-token

# Preview wildcard domain, without https://
DOKPLOY_DEV_URL=dev.example.com

# MariaDB administrative connection
DATABASE_HOST=mariadb.example.internal
DATABASE_USER=root
DATABASE_PASSWORD=your-database-password
```

### Environment Variables

| Variable | Required | Description |
|---|---:|---|
| `PORT` | No | HTTP port. Defaults to `3000`. |
| `DOKPLOY_URL` | Yes | Dokploy API base URL, normally ending in `/api`. |
| `DOKPLOY_API_TOKEN` | Yes | API key sent as `x-api-key`. |
| `DOKPLOY_DEV_URL` | Yes | Preview base domain without a URL scheme. |
| `DATABASE_HOST` | Yes | MariaDB host used for locks and optional preview databases. |
| `DATABASE_USER` | Yes | MariaDB administrative user. |
| `DATABASE_PASSWORD` | Yes | MariaDB administrative password. |

MariaDB currently uses port `3306`; it is not configurable through an environment variable.

`DATABASE_HOST`, `DATABASE_USER`, and `DATABASE_PASSWORD` are validated during startup. Missing values prevent the server from starting. Dokploy variables are validated per webhook request.

No `PROJECT_ID`, `ENVIRONMENT_ID`, or `APPLICATION_ID` variables are needed.

### Dokploy API Permissions

The API key must be able to access every project that should participate in automatic deployment. It needs permission to:

- List and read projects.
- Read application details.
- Duplicate a selected application through project duplication.
- Update, deploy, and delete applications.
- List, create, and delete domains.

Dokploy API keys are organization-scoped and inherit the generating user's access. An owner/admin key is the simplest setup when the service must manage all projects in one organization.

### MariaDB Permissions

The database administrator needs privileges for:

- `CREATE DATABASE` and `DROP DATABASE`.
- `CREATE USER` and `DROP USER`.
- `GRANT`.
- Reading schema privileges from `information_schema`.
- MariaDB `GET_LOCK` and `RELEASE_LOCK` operations.

The generated `DATABASE_URL` uses `DATABASE_HOST`, so preview containers must also be able to reach that host.

## Azure DevOps Webhook Setup

Create an Azure DevOps service hook for **Code pushed** events and point it to:

```text
https://auto-deployer.example.com/webhook/azure
```

The service handles `git.push` events and branch refs under `refs/heads/`. Other event types and tag refs are skipped. If an Azure event contains multiple ref updates, only the first is currently processed.

### Security Warning

`/webhook/azure` currently does not validate a shared secret or Azure signature. Do not expose it as an unrestricted public endpoint. Protect it with a trusted reverse proxy, private network, VPN, or appropriate source restrictions before production use.

Anyone able to send accepted webhook payloads could otherwise trigger deployments or preview cleanup.

## Installation

Requirements:

- [Bun](https://bun.sh/)
- A reachable Dokploy instance
- An Azure DevOps repository
- A reachable MariaDB/MySQL-compatible server
- Wildcard DNS for preview deployments

Install dependencies:

```bash
bun install
```

Run with hot reload:

```bash
bun run dev
```

Run normally:

```bash
bun run src/index.ts
```

Check health:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{"status":"healthy"}
```

## Docker

Build the standalone-binary image:

```bash
docker build -t azure-dokploy-deployer .
```

Run it with runtime configuration:

```bash
docker run --rm \
  --env-file .env \
  -p 3000:3000 \
  azure-dokploy-deployer
```

The final image contains only the compiled Bun executable on Debian Bookworm Slim.

## Testing

Run the Bun test suite:

```bash
bun test
```

Tests cover repository URL normalization, repository-scoped naming, legacy cleanup naming, environment parsing, database-name safety, and Auto Deploy gating. Webhook regression tests use a local mock Dokploy API returning summary-only project responses, with database operations stubbed, to cover deployments, preview creation, cleanup, deletion, and API failures. No live services are modified by the tests.

## Preview Lifecycle Details

### Creation

Preview creation is serialized per staging template with both an in-process queue and a MariaDB named lock. After acquiring the lock, the service inventories Dokploy again to ensure a retry or concurrent webhook did not already create the branch application.

Dokploy's duplicate API does not return the new application ID. The service therefore:

1. Records application IDs in the staging environment.
2. Duplicates the staging application.
3. Reads the project again.
4. Identifies the newly added application ID.
5. Reads the added application's full configuration through `application.one` before checking its source settings and configuring the preview.

### Failure Cleanup

If database creation, application update, domain setup, or deployment triggering fails, the service attempts to remove everything created by that request. Cleanup failures are logged without hiding the original error.

### Branch Deletion

A deleted branch is recognized when Azure sends an all-zero `newObjectId`. Only matching applications named `@{branch}` are treated as managed previews. The service never removes protected branch applications.

Database deletion is restricted to deterministic current or previous preview names. If an application points to another database name, the service refuses to drop it.

## API Endpoints Used

The Dokploy client currently uses:

| Endpoint | Purpose |
|---|---|
| `project.all` | Discover accessible project, environment, and application IDs |
| `project.one` | Read application ID snapshots for preview duplication and cleanup |
| `project.duplicate` | Duplicate the selected staging application |
| `application.one` | Read complete application source settings, Auto Deploy flag, and environment |
| `application.update` | Configure a new preview application |
| `application.deploy` | Trigger deployment for an enabled application |
| `application.delete` | Remove a managed preview application |
| `domain.byApplicationId` | Find copied application domains |
| `domain.delete` | Remove copied domains |
| `domain.create` | Add the generated preview domain |

## Current Limitations

- Only Dokploy generic Git applications are matched for Azure events.
- One Dokploy API key inventories one active Dokploy organization.
- Every inventory performs `application.one` for each accessible application in parallel; very large installations may need bounded concurrency or a direct index later.
- Only the first ref update in an Azure push event is processed.
- One enabled, non-copy `staging` application is allowed per repository.
- All previews share one configured preview base domain and one MariaDB administration endpoint.
- Preview creation is serialized, but branch deletion does not currently acquire the creation lock. Very rapid creation and deletion of the same branch can race.
- The webhook endpoint has no built-in request authentication.

## Project Structure

```text
src/
  index.ts                  Hono server and health endpoint
  routes/
    webhook.ts              Azure event and preview lifecycle orchestration
  lib/
    application-inventory.ts Discover application locations and fetch full details
    database.ts             MariaDB locks, database, and user management
    dokploy-client.ts       Typed Dokploy HTTP client
    utils.ts                Repository, environment, and naming utilities
    utils.test.ts           Bun unit tests
    types/                  Auto-generated Dokploy API types; do not edit
types.ts                    Azure DevOps webhook contracts
```

## Troubleshooting

### Dokploy 0.30.6 compatibility

Project endpoints return application summaries, not full configuration. The client deliberately exposes only project, environment, and application IDs from these responses. All source matching and preview configuration use `application.one`, including the post-lock refresh, newly duplicated applications, and failure cleanup.

The checked-in generated types predate this API change. No generation script is included in this repository, and Dokploy's OpenAPI response schemas do not describe these objects. As a compatibility exception to the usual endpoint-specific `RouterOutputs` return types, `getProjects()` and `getProjectById()` expose handwritten index projections in `dokploy-client.ts`. These narrow the generated project contracts without editing generated files. Full application reads validate the fields this service uses and return an explicit error if they are missing, instead of silently treating malformed responses as zero matching applications.

### Pushes do not deploy an application

Check that:

- The Dokploy source type is generic Git.
- `customGitUrl` points to the same Azure organization, project, and repository.
- `customGitBranch` exactly matches the Azure branch, including case.
- Dokploy Auto Deploy is enabled.
- The API key can read and deploy the application.

### New branches do not create previews

Check that:

- The repository has exactly one application on the exact `staging` branch.
- Auto Deploy is enabled on staging.
- The pushed branch is not protected.
- `DOKPLOY_DEV_URL` and wildcard DNS are configured.
- The API key can duplicate and update the staging application.

### Preview database is not created

Check that `DATABASE_URL` exists in the staging application's own environment configuration. An empty value is sufficient. If the key is absent, skipping database creation is intentional.

### `WP_HOME` is not changed

Check that `WP_HOME` exists in the staging application's own environment configuration. The service does not add it when absent.

### Multiple staging applications error

Only one non-copy staging application is allowed per Azure repository. Disable or move additional staging applications to another branch before retrying.

### Dokploy API errors

Confirm that `DOKPLOY_URL` is the API base URL, commonly:

```text
https://dokploy.example.com/api
```

and verify that the API key is valid and scoped to the expected organization.
