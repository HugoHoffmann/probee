"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("sessions", "SessionController.store");
Route.post("users", "UserController.store");
Route.get("users", "UserController.index");

Route.group(() => {

  Route.resource("teams", "TeamController").apiOnly();
  
}).middleware("auth");

Route.group(() => {

  Route.resource("projects", "ProjectController").apiOnly();

  Route.get("members", "MemberController.index");
  Route.put("members/:id", "MemberController.update");

}).middleware(["auth", "team"]);