'use strict'

const InviteHook = exports = module.exports = {}
const User = use('App/Models/User')
const Kue = use('Kue')
const Job = use('App/Jobs/InvitationEmail')

InviteHook.sendInvitationEmail = async (invite) => {
    const { email } = invite 
    const invited = await User.findBy('email', email)

    if(invited){
        await invited.teams().attach(invate.team_id)
    }else{
        const user = await invite.user().fetch()
        const team = await invite.team().fetch()
        
        Kue.dispatch(Job.key, { user, team, email }, { attempts: 3 })
    }

}
