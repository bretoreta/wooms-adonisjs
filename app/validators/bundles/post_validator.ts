import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const createPostValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    short_description: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    categories: vine.array(vine.number()).optional(),
    bundle_items: vine.array(
      vine.object({
        sku: vine.string().exists({
          table: 'products',
          column: 'sku',
        }),
        price: vine.number(),
        quantity: vine.number(),
      })
    ),
  })
)

/**
 * Validates the post's update action
 */
export const updatePostValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    short_description: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    sku: vine.string().trim().exists({
      table: 'bundles',
      column: 'sku',
    }),
    featured: vine.boolean().optional(),
    price: vine.number().optional(),
    sale_price: vine.number().optional(),
    manage_stock: vine.boolean().optional(),
    stock_quantity: vine.number().optional(),
    product_status: vine.string().optional(),
    force_draft: vine.boolean().optional(),
    attributes: vine
      .array(
        vine.object({
          id: vine.number(),
          name: vine.string(),
          slug: vine.string(),
          type: vine.string(),
          orderBy: vine.string(),
          hasArchives: vine.string(),
        })
      )
      .optional(),
    categories: vine.array(vine.number()).optional(),
    bundle_items: vine
      .array(
        vine.object({
          bundle_sku: vine.string().exists({
            table: 'bundles',
            column: 'sku',
          }),
          sku: vine.string().exists({
            table: 'products',
            column: 'sku',
          }),
          price: vine.number(),
          quantity: vine.number(),
        })
      )
      .optional(),
  })
)
