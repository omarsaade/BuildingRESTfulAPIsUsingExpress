//VIDLY
//its a imaginary service for renting movies
// http://vidlly.com/api/genres

// {
//   action: "";
//   horror: "";
// }

// getting the list of all genres
//select a genre
//get all genre
// create a new genre
// update or delete

const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

let genres = [
  { id: 1, genre: "Action" },
  { id: 2, genre: "Horror" },
  { id: 3, genre: "Drama" },
  { id: 4, genre: "Comdey" },
  { id: 5, genre: "Romance" },
];
//read
app.get("/api/genres", (req, res) => {
  res.send(genres);
});
//create
app.post("/api/genres", (req, res) => {
  const schema = {
    genre: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    //400 Bad request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let course = {
    id: genres.length + 1,
    genre: req.body.genre,
  };
  genres.push(course);
  res.send(course);
});

//Update
app.put("/api/genres/:id", (req, res) => {
  const gn = genres.find((x) => {
    return x.id == req.params.id;
  });

  const schema = {
    genre: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    //400 Bad request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  gn.genre = req.body.genre;
  res.send(gn);
});

//delete
app.delete("/api/genres/:id", (req, res) => {
  const gn = genres.find((x) => {
    return x.id == req.params.id;
  });

  let reso = genres.indexOf(gn);
  genres.splice(reso);
  res.send(gn);
});

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
