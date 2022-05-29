import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Teacher from './Teacher'
import ClassRoomRelation from './ClassRoomRelation'

export default class ClassRoom extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string
  @beforeCreate()
  public static async createUUID(model: ClassRoom) {
    model.id = uuid()
  }
  @column()
  public class_number: number

  @column()
  public capacity: number

  @column()
  public disponibility: boolean

  @column()
  public created_by: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @belongsTo(() => Teacher, {
    localKey: 'created_by',
  })
  public teacher: BelongsTo<typeof Teacher>

  @hasMany(() => ClassRoomRelation, {
    foreignKey: 'class_id',
  })
  public class_relation: HasMany<typeof ClassRoomRelation>
}
