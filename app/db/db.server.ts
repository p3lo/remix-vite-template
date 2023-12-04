import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

const { TURSO_LOCAL_FILE, TURSO_DB_AUTH_TOKEN, TURSO_DB_URL } = process.env;

if (!(TURSO_LOCAL_FILE && TURSO_DB_AUTH_TOKEN && TURSO_DB_URL)) {
	throw new Error(
		"Please add TURSO_LOCAL_FILE, TURSO_DB_AUTH_TOKEN and TURSO_DB_URL to .env or .env.local",
	);
}

export const client = createClient({
	url: TURSO_LOCAL_FILE,
	authToken: TURSO_DB_AUTH_TOKEN,
	syncUrl: TURSO_DB_URL,
});
await client.sync();
export const db = drizzle(client, { schema });
