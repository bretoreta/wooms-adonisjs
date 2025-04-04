import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class BundleItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare bundle_sku: string

  @column()
  declare sku: string

  @column()
  declare price: number

  @column()
  declare quantity: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
