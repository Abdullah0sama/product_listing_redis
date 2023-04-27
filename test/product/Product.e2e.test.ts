import { describe, it, beforeAll, expect } from '@jest/globals'
import { createApp } from '../../src/app'
import supertest, { } from 'supertest'
const app = createApp()

describe('GET /products', () => {

    it('Should fetch product data', async () => {

        const res = await supertest(app)
            .get('/products')
            .expect(200)
        
        expect(res.body.data).toBeDefined()
        expect(res.body.currentPage).toBeDefined()
        expect(res.body.totalPages).toBeDefined()

    })
    
    it('Should fail when limit or page is negative', async () => {

        const res = await supertest(app)
            .get('/products?limit=-1')
            .expect(400)
        expect(res.body.error).toBeDefined()
    })

    it('Should fetch product with according to specified query params', async () => {
        const res = await supertest(app)
            .get('/products?limit=20&page=2')
            .expect(200)
        
        expect(res.body.data).toHaveLength(20)
        expect(res.body.currentPage).toBe(2)
    });
})


