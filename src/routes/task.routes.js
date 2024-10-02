const express = require("express");
const TaskController = require("../controllers/task.controller"); // Corrigido

const router = express.Router();

// Rota para obter todas as tarefas
router.get("/", async (req, res) => {
  return new TaskController(req, res).getAll();
});

// Rota para obter uma tarefa por ID
router.get("/:id", async (req, res) => {
  return new TaskController(req, res).getById();
});

// Rota para atualizar uma tarefa
router.patch("/:id", async (req, res) => {
  return new TaskController(req, res).update();
});

// Rota para criar uma nova tarefa
router.post("/", async (req, res) => {
  return new TaskController(req, res).create();
});

// Rota para deletar uma tarefa
router.delete("/:id", async (req, res) => {
  return new TaskController(req, res).delete();
});

module.exports = router;
