const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
  id: Number,
  name: String,
  salary: Number,
  approved: Boolean,
});

module.exports = Person;
