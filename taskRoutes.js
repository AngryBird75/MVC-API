const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

router.get('/', controller.getTasks);
router.post('/add', controller.createTask);
router.get('/complete/:id', controller.toggleComplete);
router.get('/delete/:id', controller.deleteTask);

module.exports = router;
