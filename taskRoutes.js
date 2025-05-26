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
    res.redirect('/');
  } catch (err) {
    console.error('Error completing task:', err);
    res.status(500).send('Internal Server Error');
  }
});

// ✅ Delete task
router.get('/delete/:id', controller.deleteTask);

// ✅ Search by date (createdAt)
router.get('/search', async (req, res) => {
  try {
    const selectedDate = new Date(req.query.date);
    const start = new Date(selectedDate.setHours(0, 0, 0, 0));
    const end = new Date(selectedDate.setHours(23, 59, 59, 999));

    const tasks = await Task.find({
      createdAt: {
        $gte: start,
        $lte: end
      }
    }).sort({ createdAt: -1 });

    res.render('index', { tasks });
  } catch (error) {
    console.error('Error in search route:', error);
    res.redirect('/');
  }
});

module.exports = router;
