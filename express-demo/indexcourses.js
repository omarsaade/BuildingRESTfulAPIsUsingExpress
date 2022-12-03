const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./middleware/logger");
const auth = require("./alljsfile/auth");
//load
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); //default

app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static("public"));
app.use(helmet());
//for any routes that start with /api/courses use this router li hye courses
//or should be handled by this courses router
app.use("/api/courses", courses);
app.use("/", home);

//Configuation
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny")); //GET /api/courses 200 79 - 4.861 ms
  console.log("Morgan enabled...");
}

//Building Custom Middleware Function
app.use(function (req, res, next) {
  console.log("Logging...");
  next();
});
//Building Custom Middleware Function and importing from outside
app.use(logger);
app.use(auth);

// app.get("/", (req, res) => {
//   res.render("index", { title: "My Express App", message: "Hello" });
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
