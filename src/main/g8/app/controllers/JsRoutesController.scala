package controllers

import javax.inject.{ Inject, Singleton }

import play.api.mvc.{ Action, Controller }
import play.api.routing.JavaScriptReverseRouter

@Singleton
class JsRoutesController @Inject() extends Controller {

  def jsRoutes = Action { implicit request =>
    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        routes.javascript.Assets.versioned
      )
    ).as("text/javascript")
  }
}