import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import ClassRoom from 'App/Models/ClassRoom'
import ClassRoomRelation from 'App/Models/ClassRoomRelation'
import Teacher from 'App/Models/Teacher'

export default class ClassRoomController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.only(['class_number', 'capacity', 'disponibility', 'created_by'])

    await Teacher.findOrFail(body.created_by)

    const classroom = await ClassRoom.create(body)

    return response.json({ message: 'Sala criada com sucesso', data: classroom })
  }
  public async index({ response }: HttpContextContract) {
    const classRooms = await ClassRoom.all()

    return response.json({ data: classRooms })
  }
  public async show({ params, response }: HttpContextContract) {
    const classRooms = await ClassRoom.findOrFail(params.id)

    return response.json(classRooms)
  }
  public async update({ request, response }: HttpContextContract) {
    const params = request.params().id
    const body = request.body()
    const classRooms = await ClassRoom.findOrFail(params)

    const bodyFind = Object.keys(body).filter((m) => {
      if (ClassRoom.$columnsDefinitions.has(m) && !['id', 'created_at', 'updated_at'].includes(m))
        return m
    })

    if (bodyFind.length === 0) {
      return response.status(404).json({
        message: 'Você deve fornecer ao menos uma informação válida para editar a sala',
      })
    }
    const classRoomsRelation = await Database.from('class_room_relations').where('class_id', params)

    if (Number(body.capacity) <= classRoomsRelation.length && classRooms.disponibility === false) {
      return response.status(404).json({
        message:
          'Essa sala já esta cheia, para poder diminuir o tamanho dela, você deve, primeiramente, remover um aluno!',
      })
    } else if (classRooms.disponibility === false) {
      classRooms.disponibility = true
    }

    bodyFind.map((m) => {
      classRooms[m] = body[m]
    })

    await classRooms.save()

    return response.json({ message: 'Sala editadoa com sucesso', data: classRooms })
  }
  public async destroy({ request }: HttpContextContract) {
    const params = request.params().id
    const classRooms = await ClassRoom.findOrFail(params)
    await classRooms.delete()

    return { message: 'Sala excluída com sucesso', data: classRooms }
  }
}
