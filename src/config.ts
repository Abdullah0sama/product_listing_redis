import dotenv from 'dotenv'
dotenv.config()

import { PoolConfig } from "pg";


export const databaseConfig: PoolConfig = {
    host: process.env['DATABASE_HOST'],
    user: process.env['DATABASE_USER'],
    database: process.env['DATABASE_NAME'],
    password: process.env['DATABASE_PASSWORD'],
}

export const PORT: number = Number.parseInt(process.env['PORT']!)