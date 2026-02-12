import { SQL } from "bun";
import { randomBytes } from "crypto";

export class DatabaseManager {
	private db: InstanceType<typeof SQL>;
	private host: string;
	private port: number;

	constructor(host: string, username: string, password: string, port = 3306) {
		this.host = host;
		this.port = port;
		this.db = new SQL({
			adapter: "mysql",
			hostname: host,
			port,
			username,
			password,
			idleTimeout: 60,
			connect_timeout: 60,
			connection_timeout: 60,
			connectionTimeout: 60,
		});
	}

	/**
	 * Generate a random password for a database user
	 */
	private generatePassword(length = 24): string {
		return randomBytes(length).toString("base64url").substring(0, length);
	}

	/**
	 * Generate a random username with a prefix
	 */
	private generateUsername(dbName: string): string {
		const suffix = randomBytes(4).toString("hex");
		// MySQL usernames max 32 chars - truncate dbName portion if needed
		const maxPrefix = 32 - suffix.length - 1; // -1 for underscore
		const prefix = dbName.substring(0, maxPrefix);
		return `${prefix}_${suffix}`;
	}

	/**
	 * Create a new database with a dedicated user that has full access only to that database.
	 * Returns the credentials and connection URL.
	 */
	async createDatabase(dbName: string): Promise<{
		database: string;
		username: string;
		password: string;
		connectionUrl: string;
	}> {
		const username = this.generateUsername(dbName);
		const password = this.generatePassword();

		// Create database
		await this.db.unsafe(`CREATE DATABASE \`${dbName}\``);

		try {
			// Create user and grant privileges
			await this.db.unsafe(
				`CREATE USER '${username}'@'%' IDENTIFIED BY '${password}'`,
			);
			await this.db.unsafe(
				`GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${username}'@'%'`,
			);
			await this.db.unsafe("FLUSH PRIVILEGES");
		} catch (error) {
			// Cleanup database if user creation fails
			await this.db.unsafe(`DROP DATABASE IF EXISTS \`${dbName}\``);
			throw error;
		}

		const connectionUrl = `mariadb://${username}:${password}@${this.host}:${this.port}/${dbName}`;

		return { database: dbName, username, password, connectionUrl };
	}

	/**
	 * Drop a database and its dedicated user.
	 * Finds all users that have privileges on this database and removes them.
	 */
	async dropDatabase(dbName: string): Promise<void> {
		// Find users with grants on this database
		const users = await this.db.unsafe(
			`SELECT DISTINCT GRANTEE FROM information_schema.SCHEMA_PRIVILEGES WHERE TABLE_SCHEMA = '${dbName}'`,
		);

		// Drop each user (GRANTEE format: 'user'@'host')
		for (const row of users) {
			const grantee = (row as { GRANTEE: string }).GRANTEE;
			try {
				await this.db.unsafe(`DROP USER ${grantee}`);
			} catch (error) {
				console.error(`Failed to drop user ${grantee}:`, error);
			}
		}

		// Drop the database
		await this.db.unsafe(`DROP DATABASE IF EXISTS \`${dbName}\``);
	}
}
