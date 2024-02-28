// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { randomUUID } from 'crypto';
import { sql } from 'drizzle-orm';
import { index, int, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `rnnyrk-test_${name}`);

export const posts = createTable(
  'post',
  {
    id: text('id', { length: 36 })
      .primaryKey()
      .$defaultFn(() => randomUUID())
      .notNull(),
    name: text('name', { length: 256 }),
    content: text('content'),
    image: text('image'),
    created_at: int('created_at', { mode: 'timestamp_ms' })
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
      .notNull(),
    updated_at: int('updated_at', { mode: 'timestamp' }),
  },
  (example) => ({
    nameIndex: index('name_idx').on(example.name),
  }),
);
