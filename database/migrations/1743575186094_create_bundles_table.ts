import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bundles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('woo_id')
      table.string('name')
      table.string('type').defaultTo('simple')
      table.string('slug')
      table.boolean('featured').defaultTo(false)
      table.text('short_description').nullable()
      table.text('description').nullable()
      table.string('sku').unique()
      table.string('price')
      table.string('sale_price').nullable()
      table.boolean('manage_stock').defaultTo(true)
      table.integer('stock_quantity')
      table.string('product_status').defaultTo('draft')
      table.boolean('force_draft').defaultTo(false)
      table.jsonb('attributes').nullable()
      table.boolean('is_synced').defaultTo(false)
      table.boolean('is_images_synced').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
