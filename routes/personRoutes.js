const express = require("express");
const { update } = require("../model/person");
const router = express.Router();
const Person = require("../model/person");

// POST a new person
router.post("/newPerson", (req, res) => {
  let newPerson = new Person(req.body);
  newPerson.save((err, msg) => {
    if (err) throw err;
    else res.json({ msg: "person added" });
  });
});
// POST many person
router.post("./newPerson", (req, res) => {
  const arrayOfPerson = req.body;
  Person.create(arrayOfPerson, (err, msg) => {
    if (err) throw err;
    else res.json({ msg: "list added" });
  });
});
// Find all the person having a given name
router.get("/:name", (req, res) => {
  Person.find({ name: req.params.name }, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});
// Find just one person which has a certain food in the person's favorites
router.get("/favoriteFoods/:favoriteFoods", (req, res) => {
  Person.findOne({ favoriteFoods: req.params.favoriteFoods }, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});
// Find the (only!!) person having a given _id
router.get("/:id", (req, res) => {
  Person.findById({ _id: req.params.id }, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});
// Update person by id
router.put("/updatePerson/:id", (req, res) => {
  let updatePerson = { $push: { favoriteFoods: req.body.favoriteFoods } };
  let personId = req.params.id;
  Person.findByIdAndUpdate({ _id: personId }, updatePerson, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});

// Find a people by Name and update people's age.
router.put("/updatePersonByName/:name", (req, res) => {
  let updatePerson = req.body;
  let personByName = req.params.name;
  Person.findOneAndUpdate({ name: personByName }, updatePerson, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});
// Delete one person by the person's _id
router.delete("/:id", (req, res) => {
  Person.findByIdAndDelete({ _id: req.params.id }, (err, msg) => {
    if (err) throw err;
    else res.json({ msg: "person was deleted" });
  });
});
// Delete all the people whose name is “Mary”
router.delete("/deletPerson/:name", (req, res) => {
  Person.deleteMany({ name: req.params.name }, (err, msg) => {
    if (err) throw err;
    else res.json({ msg: "person was deleted" });
  });
});
// Find people who like burrito
router.get("/person/:favoriteFoods", (req, res) => {
  Person.find({ favoriteFoods: req.params.favoriteFoods })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) throw err;
      else res.send(data);
    });
});
module.exports = router;
