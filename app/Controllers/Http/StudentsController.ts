import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'

export default class StudentsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.only(['name', 'email', 'register_id', 'birthday'])

    const student = await Student.create(body)

    return response.json({ message: 'Estudante criado com sucesso', data: student })
  }
  public async index({ response }: HttpContextContract) {
    const students = await Student.all()

    return response.json({ data: students })
  }
  public async show({ request, response }: HttpContextContract) {
    const params = request.params().id
    const students = await Student.findOrFail(params)

    return response.json(students)
  }
  public async update({ request, response }: HttpContextContract) {
    const params = request.params().id
    const body = request.body()
    const students = await Student.findOrFail(params)

    const bodyFind = Object.keys(body).filter((m) => {
      if (Student.$columnsDefinitions.has(m) && !['id', 'created_at', 'updated_at'].includes(m))
        return m
    })

    if (bodyFind.length === 0) {
      return response.status(404).json({
        message: 'Você deve fornecer ao menos uma informação válida para editar o aluno',
      })
    }
    bodyFind.map((m) => {
      students[m] = body[m]
    })

    await students.save()

    return response.json({ message: 'Estudante editado com sucesso', data: students })
  }
  public async destroy({ request }: HttpContextContract) {
    const params = request.params().id
    const students = await Student.findOrFail(params)
    await students.delete()

    return { message: 'Estudante excluído com sucesso', data: students }
  }
}
