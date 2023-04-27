
import { describe, it, beforeAll, expect, jest, beforeEach } from '@jest/globals'
import { createMock, DeepMocked } from '@golevelup/ts-jest'
import { createClient } from 'redis'
import { RedisClientType } from '../../src/app'
import { ProductService } from '../../src/components/product/ProductService'
import { ProductRepository } from '../../src/components/product/ProductRepository'
import { ProductType } from '../../src/components/product/ProductShema'
describe('ProductService', () => {
    let redisClient: DeepMocked<RedisClientType>
    let productService: ProductService
    let productRepository: DeepMocked<ProductRepository>

    beforeAll(() => {
        redisClient = createMock<RedisClientType>();
        redisClient.json = createMock<RedisClientType['json']>()
        productRepository = createMock<ProductRepository>()

        productService = new ProductService(productRepository, redisClient)
    })
    
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('Should fetch product data', async () => {
        const listOptions = {
            limit: 20,
            page: 10
        }
        const count = 100
        const products: ProductType[] = [
            {
            id: 4,
            "price": 18,
            "description": "sit animi repellendus voluptas vitae consequatur accusantium optio cupiditate et",
            "thumbnail": "http://www.resplashed.com/img/400_06e97ddd721b.jpg",
            "category": "mug",
            "title": "Intelligent City Mug",
            "rating": 1.52
            },
        ]


        jest.spyOn(productRepository, 'countProducts').mockResolvedValue(count)
        jest.spyOn(productRepository, 'listProducts').mockResolvedValue(products)


        jest.spyOn(redisClient.json, 'get').mockResolvedValue(null)
        
        const data = await productService.productListing(listOptions)
        expect(data.data).toEqual(products)
    })

    it('Should not use repository if data is cached', async () => {

        const listOptions = {
            limit: 20,
            page: 10
        }
        const count = 100
        const products: ProductType[] = [
            {
            id: 4,
            "price": 18,
            "description": "sit animi repellendus voluptas vitae consequatur accusantium optio cupiditate et",
            "thumbnail": "http://www.resplashed.com/img/400_06e97ddd721b.jpg",
            "category": "mug",
            "title": "Intelligent City Mug",
            "rating": 1.52
            },
        ]

        jest.spyOn(productRepository, 'countProducts').mockResolvedValue(count)

        jest.spyOn(redisClient.json, 'get').mockResolvedValue(products)
        
        const data = await productService.productListing(listOptions)
        expect(data.data).toEqual(products)

        expect(productRepository.listProducts).not.toBeCalled()
        expect(redisClient.set).not.toBeCalled()

    })

    
})