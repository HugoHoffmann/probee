"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("sessions", "SessionController.store").validator("Session");
Route.post("users", "UserController.store").validator("User");

Route.group(() => {

  Route.delete("users/:id", "UserController.destroy")
  Route.put("users/:id", "UserController.update")

  Route.resource("teams", "TeamController").apiOnly()

}).middleware("auth");

Route.group(() => {
  Route.post("invites", "InviteController.store")

  Route.resource("projects", "ProjectController")
    .apiOnly()
    .validator(new Map([[["projects.store", "projects.update", "projects.destroy"], ["Project"]]]));

  Route.get("members", "MemberController.index");
  Route.put("members/:id", "MemberController.update");
  Route.delete("members/:id", "MemberController.destroy");

}).middleware(["auth", "team"]);
