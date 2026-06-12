const express = require("express");

const router = express.Router();

let tasks = [
  {
    id: 1,
    title: "Task manager api",
    description: "Build a REST API for task managemnet",
    completed: false,
  },
];

let nextId = 2;

// GET /tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.json(task);
});

// POST /tasks
router.post("/", (req, res) => {
  const { title, description, completed } = req.body;

  const newTask = {
    id: nextId++,
    title,
    description,
    completed,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// PUT /tasks/:id
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const { title, description, completed } = req.body;

  task.title = title;
  task.description = description;
  task.completed = completed;

  res.json(task);
});

// DELETE /tasks/:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks.splice(taskIndex, 1);

  res.json({
    message: "Task deleted successfully",
  });
});

module.exports = router;
