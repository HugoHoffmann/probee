'use strict'

const User = use('App/Models/User');
class UserController {
    async store({ request, response, auth }){
        const data = request.only([ 'name', 'email', 'password' ])
        const user = await User.create(data)

        const token = await auth.attempt(data.email, data.password)

        return token
    }
}

module.exports = UserController
