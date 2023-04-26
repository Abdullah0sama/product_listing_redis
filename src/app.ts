import express from 'express'
import { ProductRepository } from './components/product/ProductRepository'
import { ProductController } from './components/product/ProductController'
import { createDB } from './database/databaseConfig'
import { ErrorHandler } from './utils/middleware/errorHandler'
import { ProductService } from './components/product/ProductService'
import { createClient } from 'redis'
import { stringifyObj } from './utils/stringifyObj'


export type RedisClientType = ReturnType<typeof createClient>

export function createApp() {
    const client = createClient()
    client.connect()
    const app = express()

    const db = createDB()
    const productRepository = new ProductRepository(db) 
    const productService = new ProductService(productRepository, client)
    const productController = new ProductController(productService)
    
    app.use('/', productController.getRoutes())
    
    app.use(ErrorHandler)


    return app
}