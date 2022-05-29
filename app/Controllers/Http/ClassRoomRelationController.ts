/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import ClassRoom from 'App/Models/ClassRoom'
import ClassRoomRelation from 'App/Models/ClassRoomRelation'
import Student from 'App/Models/Student'

export default class ClassRoomRelationController {
  public async store({ request, response }: HttpContextContract) {
    const { student_id, class_id, created_by } = request.only([
      'student_id',
      'class_id',
      'created_by',
    ])

    const teacherFindClass = await Database.from('class_rooms')
      .where('created_by', created_by)
      .andWhere('id', class_id)

    if (teacherFindClass.length === 0)
      return response
        .status(404)
        .json({ message: 'Sala não encontrada ou não foi criada pelo professor!' })

    await Student.findOrFail(student_id)
    const classRoom = await ClassRoom.findOrFail(class_id)
    const findUserClassRelation = await Database.from('class_room_relations')
      .where('student_id', student_id)
      .andWhere('class_id', class_id)

    if (findUserClassRelation.length > 0)
      return response
        .status(404)
        .json({ message: 'Esse estudante já está matriculado nesse sala!' })
    let findAllClasses = await Database.from('class_room_relations').where('class_id', class_id)

    if (classRoom.disponibility === false || findAllClasses.length >= classRoom.capacity) {
      if (classRoom.disponibility === true) {
        classRoom.disponibility = false
        classRoom.save()
      }
      return response.status(404).json({ message: 'Esse sala já está cheia!' })
    }

    const classroom = await ClassRoomRelation.create({ student_id, class_id })

    return response.json({ message: 'Estudante cadastrado na sala com sucesso', data: classroom })
  }
  public async showStudentsRooms({ params, response }: HttpContextContract) {
    const { rows: classes } =
      await Database.rawQuery(`select distinct s.name as name_aluno, t.name as teacher_name, cr.class_number  from class_rooms cr inner join class_room_relations crr on cr.id in (
        select class_id from class_room_relations where student_id = '${params.id}'
      ) inner join teachers t on t.id = cr.created_by inner join students s on s.id = '${params.id}'`)

    if (classes.length === 0)
      return response.json({
        message: 'Não há nenhuma classe registrada para esse aluno!',
      })

    const newclasses = {
      name_aluno: classes[0].name_aluno,
      classes: classes.map((m) => {
        return { teacher_name: m.teacher_name, class_number: m.class_number }
      }),
    }

    return response.json({ data: newclasses })
  }
  public async showAllSudentsRoom({ request, response }: HttpContextContract) {
    const params = request.params().id

    const { rows: classes } = await Database.rawQuery(
      `select * from students where id in (select student_id from class_room_relations where class_id ='${params}')`
    )

    return response.json({ data: classes })
  }
  public async removeStudent({ params, response }: HttpContextContract) {
    const classRoomsRelation = await ClassRoomRelation.query()
      .where('student_id', params.student_id)
      .andWhere('class_id', params.class_id)

    if (classRoomsRelation.length === 0)
      return response.status(404).json({ message: 'Estudante não foi encontrado nessa sala!' })

    await ClassRoomRelation.query().delete().where('id', classRoomsRelation[0].id)

    const classes = await ClassRoom.query().where('id', params.class_id)

    if (classRoomsRelation.length < classes[0].capacity && classes[0].disponibility === false) {
      classes[0].disponibility = true
    }

    classes[0].save()

    return response.json({ message: 'Estudante excluído da sala com sucesso', data: classes })
  }
}
