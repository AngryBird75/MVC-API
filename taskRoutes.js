const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

router.get('/', controller.getTasks);
router.post('/add', controller.createTask);

// ✅ Update: Complete the task and set completion time
router.get('/complete/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const Task = require('../models/taskModel');
    await Task.findByIdAndUpdate(taskId, {
      isCompleted: true,
      completedAt: new Date()
    });
    res.redirect('/');
  } catch (err) {
    console.error('Error completing task:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/delete/:id', controller.deleteTask);

module.exports = router;
