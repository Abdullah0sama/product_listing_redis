import { Router } from "express";
import { ProductRepository } from "./ProductRepository";
import { ProductListingSchema } from "./ProductShema";



export class ProductController {
    
    constructor(
        private productRepository: ProductRepository
    ) {} 


    getRoutes() {
        const router = Router()

        router.get('/products', async (req, res, next) => {
            try {
                const listingOptions = await ProductListingSchema.parseAsync(req.query)
                const products = await this.productRepository.listProducts(listingOptions)
                res.status(200).send({
                    data: products
                })
            } catch (err: unknown) {
                next(err)
            }
        })


        return router
    }
}