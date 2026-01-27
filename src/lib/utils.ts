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
 * Extract branch name from refs/heads/branch-name format
 */
export function extractBranchName(ref: string): string {
	return ref.replace(/^refs\/heads\//, "");
}

/**
 * Generate preview URL for a branch
 */
export function generatePreviewUrl(branchName: string, devUrl: string): string {
	const slug = slugify(branchName);
	const hashValue = hash(branchName, 8);
	return `${slug}-${hashValue}.${devUrl}`;
}
