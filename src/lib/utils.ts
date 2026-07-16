import { createHash } from "crypto";

/**
 * Convert a string to a URL-safe slug
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/**
 * Generate a hash of specified length from a string
 */
export function hash(text: string, length: number = 8): string {
	return createHash("sha256").update(text).digest("hex").substring(0, length);
}

/**
 * Normalize a Git repository URL for identity comparisons.
 * Azure HTTPS and SSH clone URLs resolve to the same repository key.
 */
export function normalizeRepositoryUrl(repositoryUrl: string): string | null {
	const trimmedUrl = repositoryUrl.trim();
	if (!trimmedUrl) return null;

	let url: URL;
	const scpMatch = trimmedUrl.includes("://")
		? null
		: trimmedUrl.match(/^(?:[^@/\s]+@)?([^:/\s]+):(.+)$/);
	try {
		url = scpMatch
			? new URL(`ssh://${scpMatch[1]}/${scpMatch[2]}`)
			: new URL(trimmedUrl);
	} catch {
		return null;
	}

	const host = url.hostname.toLowerCase();
	let segments: string[];
	try {
		segments = url.pathname
			.split("/")
			.filter(Boolean)
			.map((segment) => decodeURIComponent(segment));
	} catch {
		return null;
	}

	const normalizeAzureIdentity = (
		organization: string,
		project: string,
		repository: string,
	): string => {
		const repositoryName = repository.replace(/\.git$/i, "");
		return `azure://${organization.toLowerCase()}/${project.toLowerCase()}/${repositoryName.toLowerCase()}`;
	};

	if (
		host === "dev.azure.com" &&
		segments.length === 4 &&
		segments[2]?.toLowerCase() === "_git"
	) {
		return normalizeAzureIdentity(segments[0]!, segments[1]!, segments[3]!);
	}

	if (
		host === "ssh.dev.azure.com" &&
		segments.length === 4 &&
		segments[0]?.toLowerCase() === "v3"
	) {
		return normalizeAzureIdentity(segments[1]!, segments[2]!, segments[3]!);
	}

	if (
		host.endsWith(".visualstudio.com") &&
		segments.length === 3 &&
		segments[1]?.toLowerCase() === "_git"
	) {
		return normalizeAzureIdentity(
			host.slice(0, -".visualstudio.com".length),
			segments[0]!,
			segments[2]!,
		);
	}

	if (segments.length === 0) return null;
	segments[segments.length - 1] = segments[segments.length - 1]!.replace(
		/\.git$/i,
		"",
	);

	const protocol = url.protocol.toLowerCase();
	const isDefaultPort =
		(protocol === "https:" && url.port === "443") ||
		(protocol === "http:" && url.port === "80") ||
		(protocol === "ssh:" && url.port === "22");
	const port = url.port && !isDefaultPort ? `:${url.port}` : "";

	return `${protocol}//${host}${port}/${segments.join("/")}`;
}

/**
 * Extract branch name from refs/heads/branch-name format
 */
export function extractBranchName(ref: string): string {
	return ref.replace(/^refs\/heads\//, "");
}

/**
 * Generate the preview prefix for a branch (slug-hash)
 */
export function generatePreviewPrefix(
	repositoryName: string,
	repositoryId: string,
	branchName: string,
): string {
	const hashValue = hash(`${repositoryId}:${branchName}`, 8);
	const maxSlugLength = 63 - hashValue.length - 1;
	const slug =
		slugify(`${repositoryName}-${branchName}`)
			.substring(0, maxSlugLength)
			.replace(/-+$/, "") || "preview";
	return `${slug}-${hashValue}`;
}

/**
 * Generate the branch-only prefix used before repository-scoped previews.
 */
export function generateLegacyPreviewPrefix(branchName: string): string {
	return `${slugify(branchName)}-${hash(branchName, 8)}`;
}

/**
 * Generate preview URL for a branch
 */
export function generatePreviewUrl(
	repositoryName: string,
	repositoryId: string,
	branchName: string,
	devUrl: string,
): string {
	return `${generatePreviewPrefix(repositoryName, repositoryId, branchName)}.${devUrl}`;
}

/**
 * Generate a preview URL created by the previous branch-only naming scheme.
 */
export function generateLegacyPreviewUrl(
	branchName: string,
	devUrl: string,
): string {
	return `${generateLegacyPreviewPrefix(branchName)}.${devUrl}`;
}

/**
 * Generate a database name from a branch name.
 * Uses the same preview prefix but with underscores instead of dashes (MySQL-safe).
 */
export function generateDbName(
	repositoryName: string,
	repositoryId: string,
	branchName: string,
): string {
	return generatePreviewPrefix(repositoryName, repositoryId, branchName).replace(
		/-/g,
		"_",
	);
}

/**
 * Generate a database name created by the previous branch-only naming scheme.
 */
export function generateLegacyDbName(branchName: string): string {
	return generateLegacyPreviewPrefix(branchName).replace(/-/g, "_");
}

/**
 * Read a value from a newline-delimited environment string.
 */
export function getEnvValue(env: string | null, key: string): string | null {
	if (!env) return null;
	const match = env.match(new RegExp(`^${key}=(.*)$`, "m"));
	if (!match) return null;

	const value = match[1]!.trim();
	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		return value.slice(1, -1);
	}
	return value;
}

/**
 * Extract a safe MySQL database name from an application's DATABASE_URL.
 */
export function getDatabaseNameFromEnv(env: string | null): string | null {
	const connectionUrl = getEnvValue(env, "DATABASE_URL");
	if (!connectionUrl) return null;

	try {
		const databaseName = decodeURIComponent(
			new URL(connectionUrl).pathname.replace(/^\/+/, ""),
		);
		return /^[a-zA-Z0-9_]{1,64}$/.test(databaseName) ? databaseName : null;
	} catch {
		return null;
	}
}

/**
 * Replace a value in a .env string by key name.
 * Handles both template placeholders (KEY=${{project.X}}) and explicit values
 * (KEY=something or KEY="something"). If the key doesn't exist, appends it.
 */
export function setEnvValue(env: string, key: string, value: string): string {
	const regex = new RegExp(`^${key}=.*$`, "m");
	if (regex.test(env)) {
		return env.replace(regex, `${key}=${value}`);
	}
	return env ? `${env}\n${key}=${value}` : `${key}=${value}`;
}
