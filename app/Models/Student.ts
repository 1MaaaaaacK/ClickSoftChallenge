import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import ClassRoomRelation from './ClassRoomRelation'

export default class Student extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string
  @beforeCreate()
  public static async createUUID(model: Student) {
    model.id = uuid()
  }

  @column()
  public name: string

  @column()
  public password: string

  @column()
  public email: string

  @column()
  public register_id: string

  @column.date()
  public birthday: DateTime
  @beforeCreate()
  public static async changeDate(model: Student) {
    //Não é a melhor forma, mas funciona (não encontrei outro jeito de fazer)
    model.birthday = DateTime.fromISO(moment(model.birthday.toString(), 'DD/MM/YYYY').format())
  }

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @hasMany(() => ClassRoomRelation, {
    foreignKey: 'student_id',
  })
  public class_relation: HasMany<typeof ClassRoomRelation>
}
