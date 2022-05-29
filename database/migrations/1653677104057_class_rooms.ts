import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'class_rooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.integer('class_number').unique().notNullable()
      table.integer('capacity').notNullable()
      table.boolean('disponibility').notNullable()
      table
        .uuid('created_by')
        .unsigned()
        .references('id')
        .inTable('teachers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
