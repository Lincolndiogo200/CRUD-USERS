const router = require("express").Router();

const Person = require("../models/person");

// Create
router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name || salary === undefined || approved === undefined) {
    return res.status(422).json({
      message: "Todos os campos devem ser preenchidos",
    });
  }

  const person = {
    name,
    salary,
    approved,
  };
  try {
    const newPerson = await Person.create(person);

    res.status(201).json({
      message: `Usuário: ${newPerson.name} criado com sucesso!`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Erro interno no servidor.",
    });
  }
});

// Read
router.get("/", async (_req, res) => {
  try {
    const people = await Person.find();
    return res.status(200).json(people);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

// Read Unique
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({
        message: "O usuário não foi encontrado!",
      });
      return;
    }
    return res.status(200).json(person);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

// Update

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };
  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({
        message: "O usuário não foi encontrado!",
      });
      return;
    }
    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if (!person) {
    res.status(422).json({
      message: "O usuário não foi encontrado!",
    });
    return;
  }
  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({
      message: `Usuário: ${person.name} removido com sucesso!`,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;
