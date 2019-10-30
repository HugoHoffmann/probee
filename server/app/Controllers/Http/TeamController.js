'use strict'

class TeamController {
    /**
   * Show a list of all teams.
   * GET teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    const teams = await auth.user.teams().fetch()

    return teams
  }
}

module.exports = TeamController
