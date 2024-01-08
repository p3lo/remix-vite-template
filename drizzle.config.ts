import * as dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'
dotenv.config({
  path: '.env',
})

export default {
  schema: './app/db/schema.ts',
  out: './drizzle',
  driver: 'turso',
  tablesFilter: '!libsql_wasm_func_table',
  dbCredentials: {
    url: process.env.TURSO_DB_URL as string,
    authToken: process.env.TURSO_DB_AUTH_TOKEN as string,
  },
} satisfies Config
