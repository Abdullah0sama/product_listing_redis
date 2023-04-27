import RedisClient from "@redis/client/dist/lib/client";
import { ProductRepository } from "./ProductRepository";
import { ProductListingType, ProductType } from "./ProductShema";
import { RedisClientType } from "../../app";
import { stringifyObj } from "../../utils/stringifyObj";
import { ProductTable } from "../../database/DatabaseTypes";

export class ProductService {
    constructor(
        private productRepository: ProductRepository,
        private redisClient: RedisClientType
    ){}



    async productListing(productListing: ProductListingType) {
        const { limit, page } = productListing

        const keyName = stringifyObj(productListing)
        let products = await this.redisClient.json.get(keyName) as ProductType[] | null
        if(!products) {
            products = await this.productRepository.listProducts(productListing)
            // this.redisClient.setEx('sdas', 142, JSON.stringify(products))
            await this.redisClient.json.set(keyName, '$',  products)
            await this.redisClient.expire(keyName, 60 * 5)
        }

        const productCount = await this.productRepository.countProducts()
        const totalPages = Math.ceil(productCount / limit)


        return { data: products, totalPages, currentPage: page }
    }
}