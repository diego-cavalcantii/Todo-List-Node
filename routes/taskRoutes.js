const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Criar uma nova tarefa
router.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar a tarefa' });
  }
});

// Listar todas as tarefas
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as tarefas' });
  }
});

// Buscar uma tarefa específica por ID
router.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a tarefa' });
  }
});

// Atualizar uma tarefa
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    task.title = title;
    task.description = description;
    task.completed = completed;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
  }
});

// Deletar uma tarefa
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    await task.destroy();
    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar a tarefa' });
  }
});

module.exports = router;
