'use strict'

const User = use('App/Models/User')
class UserController {
    async store({ request, auth }){
        const data = request.only([ 'name', 'email', 'password' ])
        const user = await User.create(data)

        // const token = await auth.attempt(data.email, data.password)

        return user
    }

    async index({ request }){
        const users = await User.query()
            // .where('team_id', request.team.id)
            .fetch()
        
        return users
    }
}

module.exports = UserController
