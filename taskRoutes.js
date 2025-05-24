const Task = require('../models/taskModel');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.render('index', { tasks });
};

exports.createTask = async (req, res) => {
  const { title } = req.body;
  await Task.create({ title });
  res.redirect('/');
};

exports.toggleComplete = async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.isCompleted = !task.isCompleted;
  await task.save();
  res.redirect('/');
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

router.get('/', controller.getTasks);
router.post('/add', controller.createTask);
router.get('/complete/:id', controller.toggleComplete);
router.get('/delete/:id', controller.deleteTask);

module.exports = router;
