import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('product')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('title', 'varchar(50)', (col) => col.notNull())
        .addColumn('price', 'integer', (col) => col.notNull())
        .addColumn('rating', 'decimal', (col) => col.notNull())
        .addColumn('description', 'varchar(260)')
        .addColumn('category', 'varchar(50)')
        .addColumn('thumbnail', 'varchar(100)')
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .dropTable('product')
        .execute()
}   