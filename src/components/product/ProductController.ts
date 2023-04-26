import { Router } from "express";
import { ProductRepository } from "./ProductRepository";
import { ProductListingSchema } from "./ProductShema";
import { ProductService } from "./ProductService";



export class ProductController {
    
    constructor(
        private productService: ProductService
    ) {} 


    getRoutes() {
        const router = Router()

        router.get('/products', async (req, res, next) => {
            try {
                const listingOptions = await ProductListingSchema.parseAsync(req.query)
                const data = await this.productService.productListing(listingOptions)
                res.status(200).send(data)
                
            } catch (err: unknown) {
                next(err)
            }
        })


        return router
    }
}