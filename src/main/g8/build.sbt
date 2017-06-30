lazy val root = (project in file("."))
  .enablePlugins(PlayScala)
  .configs(IntegrationTest)
  .settings(Defaults.itSettings)
  .settings(commonSettings)
  .settings(
    libraryDependencies ++= dependencies
  )

lazy val dependencies = Seq(
  "org.scalatestplus.play" %% "scalatestplus-play" % "2.0.0" % "test,it",

  filters,
  "org.webjars" %% "webjars-play" % "2.5.0",
  "org.webjars" % "knockout" % "3.4.1",
  "org.webjars.npm" % "systemjs" % "0.19.40"
)

lazy val commonSettings = Seq(
  name := """$name$""",
  organization := "$organization$",
  scalaVersion := "2.11.11",
  version := "1.0-SNAPSHOT"
)

lazy val IntegrationTest = config("it") extend Test