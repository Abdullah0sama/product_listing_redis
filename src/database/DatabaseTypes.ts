
import { Generated,  } from 'kysely'


export interface ProductTable {
    id: Generated<number>,
    title: string,
    description: string | null,
    thumbnail: string | null,
    rating: number,
    price: number,
    category: string | null
}

export interface Database {
    product: ProductTable,
}