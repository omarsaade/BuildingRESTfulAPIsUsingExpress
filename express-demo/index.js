const express = require("express");
//create our express application
const app = express();

//callback: this is the function that will be called
//when we have an HTTP GET req to this endpoint.
//callback Fn also called Route Handler
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

// /api/courses/1

// app.get("/api/courses/:id", (req, res) => {
//   res.send(req.params.id);
// });

app.get("/api/posts/:year/:month", (req, res) => {
  // res.send(req.params);
  // res.send(req.params.year);
  //send to client
  res.send(req.query);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
