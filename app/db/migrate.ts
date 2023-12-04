/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable unicorn/no-process-exit */
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import "dotenv/config";

export const client = createClient({
	url: process.env.TURSO_LOCAL_FILE as string,
	authToken: process.env.TURSO_DB_AUTH_TOKEN as string,
	syncUrl: process.env.TURSO_DB_URL as string,
});

export const db = drizzle(client);

async function main() {
	try {
		await migrate(db, {
			migrationsFolder: "drizzle",
		});
		console.log("Tables migrated!");
		process.exit(0);
	} catch (error) {
		console.error("Error performing migration:", error);
		process.exit(1);
	}
}

main();
