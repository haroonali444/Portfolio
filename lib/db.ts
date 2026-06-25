import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const contacts = pgTable('contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  read: boolean('read').default(false),
})

export const db = drizzle(pool, { schema: { contacts } })
