import express from 'express'
import { ProductRepository } from './components/product/ProductRepository'
import { ProductController } from './components/product/ProductController'
import { createDB } from './database/databaseConfig'
import { ErrorHandler } from './utils/middleware/errorHandler'



export function createApp() {

    const app = express()

    const db = createDB()
    const productRepository = new ProductRepository(db) 
    const productController = new ProductController(productRepository)
    
    app.use('/', productController.getRoutes())
    
    
    app.use(ErrorHandler)


    return app
}