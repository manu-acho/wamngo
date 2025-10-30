import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/wam';
const client = neon(databaseUrl);
export const db = drizzle(client, { schema });