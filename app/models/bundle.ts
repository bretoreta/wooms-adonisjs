import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { slugify } from '@adonisjs/lucid-slugify'
import Category from './category.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Image from './image.js'
import BundleItem from './bundle_item.js'

export default class Bundle extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare woo_id: string

  @column()
  declare name: string

  @column()
  declare type: string

  @column()
  @slugify({
    fields: ['name'],
  })
  declare slug: string

  @column()
  declare featured: boolean

  @column()
  declare short_description: string

  @column()
  declare description: string

  @column()
  declare sku: string

  @column()
  declare price: number

  @column()
  declare sale_price: number

  @column()
  declare manage_stock: boolean

  @column()
  declare stock_quantity: number

  @column()
  declare product_status: string

  @column()
  declare force_draft: boolean

  @column()
  declare attributes: Array<object>

  @column()
  declare is_synced: boolean

  @column()
  declare is_images_synced: boolean

  @manyToMany(() => Category)
  declare categories: ManyToMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Image, {
    foreignKey: 'product_sku',
    localKey: 'sku',
  })
  declare images: HasMany<typeof Image>

  @hasMany(() => BundleItem, {
    foreignKey: 'bundle_sku',
    localKey: 'sku',
  })
  declare items: HasMany<typeof BundleItem>
}
