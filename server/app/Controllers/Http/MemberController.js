'use strict'

const UserTeam = use('App/Models/UserTeam')

class MemberController {
    async index({ request }){
        const members = await UserTeam.query()
            .where('team_id', request.team.id)
            .with('user')
            .fetch()
        
            return members
    }

    async update({request, params}){
        const teamJoin = await UserTeam.find(params.id)
    }
}

module.exports = MemberController
