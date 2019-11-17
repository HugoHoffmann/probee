'use strict'


/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')


class DatabaseSeeder {
  async run () {
    const user = await User.create({
      name: 'Hugo Hoffmann',
      email: 'hugohoffmann0444@gmail.com',
      password: '123456'
    })

    const team = await user.teams().create({
      name: 'Htech',
      user_id: user.id,
    })

  }
}

module.exports = DatabaseSeeder
