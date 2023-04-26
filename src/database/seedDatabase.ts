import { ProductTable } from "./DatabaseTypes";
import { createDB } from "./databaseConfig";
import fs from 'fs/promises'
import * as path from 'path'

export async function seedDB() {

    const data = await fs.readFile(path.join(__dirname, '../../db_seed/product_data.json'), 'utf-8')
    const products: Omit<ProductTable, 'id'> = JSON.parse(data)

    const db = createDB()
    await db.deleteFrom('product').execute()
    await db.insertInto('product').values(products).execute()


    console.log('Seed has been run successfully.')
    await db.destroy()

}


seedDB().catch((err) => {
    console.log(`Something went wrong: ${err}`)
})