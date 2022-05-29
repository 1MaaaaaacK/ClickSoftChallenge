import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import ClassRoom from './ClassRoom'
import { v4 as uuid } from 'uuid'
export default class ClassRoomRelation extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  @beforeCreate()
  public static async createUUID(model: Student) {
    model.id = uuid()
  }

  @column()
  public student_id: string

  @column()
  public class_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Student, {
    localKey: 'student_id',
  })
  public userid: BelongsTo<typeof Student>

  @belongsTo(() => ClassRoom, {
    localKey: 'class_id',
  })
  public classid: BelongsTo<typeof ClassRoom>
}
