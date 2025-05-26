const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');
const Task = require('../models/taskModel'); // ✅ Required for direct model usage

router.get('/', controller.getTasks);
router.post('/add', controller.createTask);

// ✅ Complete the task
router.get('/complete/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndUpdate(taskId, {
      isCompleted: true,
      completedAt: new Date()
    });

