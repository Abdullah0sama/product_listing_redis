import { Kysely, sql } from "kysely";
import { Database } from "../../database/DatabaseTypes";
import { ProductListingType } from "./ProductShema";


export class ProductRepository {
    constructor(
        private db: Kysely<Database>
        ) {}

    async listProducts({ limit, page }: ProductListingType) {
        const products = await this.db.selectFrom('product')
        .selectAll()
        .limit(limit)
        .offset((page - 1) * limit)
        .execute()  
        return products
    }

    async countProducts() {

        const { count } = await this.db.selectFrom('product').select(sql<number>`count(id)`.as('count')).executeTakeFirstOrThrow()
        return count
    }
}