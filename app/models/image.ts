import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class Image extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare featured: boolean

  @column({
    serializeAs: null,
  })
  declare product_sku: string

  @column({
    serializeAs: null,
  })
  declare product_id: number

  @column({
    serializeAs: null,
  })
  declare is_synced: boolean

  @column()
  declare path: string

  @column()
  declare url: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async setId(image: Image) {
    image.id = crypto.randomUUID()
  }

  @belongsTo(() => Product, {
    foreignKey: 'product_id',
  })
  declare product: BelongsTo<typeof Product>
}
