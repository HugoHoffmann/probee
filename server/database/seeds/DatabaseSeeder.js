'use strict'


/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')


class DatabaseSeeder {
  async run () {
    const user = await User.create({
      name: 'Administrador',
      email: 'admin@probee.com',
      password: '123456'
    })

    const team = await user.teams().create({
      name: 'Probee',
      user_id: user.id,
    })

  }
}

module.exports = DatabaseSeeder
