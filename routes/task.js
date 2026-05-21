const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /task -> lista todos
router.get('/', taskController.task_list);

// POST /task -> crea uno
router.post('/', taskController.task_create);

// GET /task/:id -> obtiene uno
router.get('/:id', taskController.task_detail);

// PUT /task/:id -> actualiza uno
router.put('/:id', taskController.task_update);

// DELETE /task/:id -> elimina uno
router.delete('/:id', taskController.task_delete);



module.exports = router;
