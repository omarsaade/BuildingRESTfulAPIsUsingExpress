//samayneha Joi bi ahref awal kbir li2ana btarje3 class.
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

let courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    //400 Bad request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
});

//                      Update the course
app.put("/api/courses/:id", (req, res) => {
  //look up the course
  //if not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The Course with the given ID was not found.");

  //Validate
  //If invalid, return 400- Bad request
  // const result = validateCourse(req.body);

  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(result.error.details[0].message);

  //Update Course
  course.name = req.body.name;
  //Return the updated course
  res.send(course);
});

///////////////////

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The Course with the given ID was not found.");
  /*
  let filtered = courses.filter((e) => {
    return e.id !== parseInt(req.params.id);
  });

  // console.log(filtered);
  courses = filtered;

  or second meth
  */

  let index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  res.send(course);
});
