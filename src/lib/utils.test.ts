import { describe, expect, test } from "bun:test";
import {
	generateDbName,
	generateLegacyDbName,
	generateLegacyPreviewUrl,
	generatePreviewPrefix,
	getDatabaseNameFromEnv,
	getEnvValue,
	isAutoDeployEnabled,
	normalizeRepositoryUrl,
	setEnvValue,
} from "./utils";

describe("normalizeRepositoryUrl", () => {
	test("matches Azure HTTPS and SSH clone URLs", () => {
		expect(
			normalizeRepositoryUrl(
				"https://dev.azure.com/OrganizationName/ProjectName/_git/RepositoryName",
			),
		).toBe(
			normalizeRepositoryUrl(
				"git@ssh.dev.azure.com:v3/OrganizationName/ProjectName/RepositoryName",
			),
		);
	});

	test("ignores Azure HTTPS credentials", () => {
		expect(
			normalizeRepositoryUrl(
				"https://deploy-user:secret@dev.azure.com/OrganizationName/ProjectName/_git/RepositoryName",
			),
		).toBe("azure://organizationname/platform/website");
	});

	test("matches legacy Azure organization URLs", () => {
		expect(
			normalizeRepositoryUrl(
				"https://organizationname.visualstudio.com/ProjectName/_git/RepositoryName",
			),
		).toBe("azure://organizationname/platform/website");
	});

	test("does not match repositories from different projects", () => {
		expect(
			normalizeRepositoryUrl(
				"https://dev.azure.com/OrganizationName/ProjectName/_git/RepositoryName",
			),
		).not.toBe(
			normalizeRepositoryUrl(
				"https://dev.azure.com/OrganizationName/OtherProjectName/_git/RepositoryName",
			),
		);
	});
});

describe("preview resource names", () => {
	test("are repository-specific for the same branch", () => {
		const first = generatePreviewPrefix("website", "repo-1", "feature/login");
		const second = generatePreviewPrefix("website", "repo-2", "feature/login");

		expect(first).not.toBe(second);
	});

	test("fit DNS label and MySQL identifier limits", () => {
		const longName = "repository".repeat(10);
		const longBranch = "feature/" + "long-branch-".repeat(20);
		const prefix = generatePreviewPrefix(longName, "repo-1", longBranch);
		const dbName = generateDbName(longName, "repo-1", longBranch);

		expect(prefix.length).toBeLessThanOrEqual(63);
		expect(dbName.length).toBeLessThanOrEqual(64);
		expect(dbName).toMatch(/^[a-z0-9_]+$/);
	});

	test("preserve the previous branch-only names for cleanup", () => {
		expect(generateLegacyDbName("feature/login")).toBe(
			"feature_login_df7c7aeb",
		);
		expect(generateLegacyPreviewUrl("feature/login", "dev.example.com")).toBe(
			"feature-login-df7c7aeb.dev.example.com",
		);
	});
});

describe("environment helpers", () => {
	test("distinguishes an empty variable from a missing variable", () => {
		expect(getEnvValue("DATABASE_URL=", "DATABASE_URL")).toBe("");
		expect(getEnvValue("APP_ENV=staging", "DATABASE_URL")).toBeNull();
	});

	test("sets the first value without a leading newline", () => {
		expect(setEnvValue("", "WP_HOME", "https://preview.example.com")).toBe(
			"WP_HOME=https://preview.example.com",
		);
	});

	test("extracts the database used by an existing preview", () => {
		const env = [
			"WP_HOME=https://preview.example.com",
			'DATABASE_URL="mariadb://user:password@database:3306/feature_login_12345678"',
		].join("\n");

		expect(getDatabaseNameFromEnv(env)).toBe("feature_login_12345678");
	});

	test("rejects unsafe database names", () => {
		expect(
			getDatabaseNameFromEnv(
				"DATABASE_URL=mariadb://user:password@database:3306/unsafe-name",
			),
		).toBeNull();
	});
});

describe("isAutoDeployEnabled", () => {
	test("only enables explicit true values", () => {
		expect(isAutoDeployEnabled(true)).toBeTrue();
		expect(isAutoDeployEnabled(false)).toBeFalse();
		expect(isAutoDeployEnabled(null)).toBeFalse();
		expect(isAutoDeployEnabled(undefined)).toBeFalse();
	});
});
