"use strict";

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
  async index({ auth }) {
    const teams = await auth.user.teams().fetch();

    return teams;
  }

  /**
   * Create/save a new team.
   * POST teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(["name"]);

    const team = await auth.user.teams().create({
      ...data,
      user_id: auth.user.id
    });

    return team;
  }
}

module.exports = TeamController;
