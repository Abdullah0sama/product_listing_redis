import { z }  from 'zod'

export const ProductListingSchema = z.object({
    limit: z.coerce.number().gt(0).default(10),
    page: z.coerce.number().gt(0).default(1)
})

export type ProductListingType = z.infer<typeof ProductListingSchema>