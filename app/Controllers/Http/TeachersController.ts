import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teacher from 'App/Models/Teacher'

export default class StudentsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const teacher = await Teacher.create(body)

    return response.json({ message: 'Professor criado com sucesso', data: teacher })
  }
  public async index({ response }: HttpContextContract) {
    const teachers = await Teacher.all()

    return response.json({ data: teachers })
  }
  public async show({ request, response }: HttpContextContract) {
    const params = request.params().id
    const teachers = await Teacher.findOrFail(params)

    return response.json(teachers)
  }
  public async update({ request, response }: HttpContextContract) {
    const params = request.params().id
    const body = request.body()
    const teachers = await Teacher.findOrFail(params)

    const bodyFind = Object.keys(body).filter((m) => {
      if (Teacher.$columnsDefinitions.has(m) && !['id', 'created_at', 'updated_at'].includes(m))
        return m
    })

    if (bodyFind.length === 0) {
      return response.status(404).json({
        message: 'Você deve fornecer ao menos uma informação válida para editar o professor',
      })
    }
    bodyFind.map((m) => {
      teachers[m] = body[m]
    })

    await teachers.save()

    return response.json({ message: 'Professor editado com sucesso', data: teachers })
  }
  public async destroy({ request, response }: HttpContextContract) {
    const params = request.params().id
    const teachers = await Teacher.findOrFail(params)
    await teachers.delete()

    return response.json({ message: 'Professor excluído com sucesso', data: teachers })
  }
}
