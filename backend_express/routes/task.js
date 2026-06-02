const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../middleware/upload');

router.use(verifyToken);

// GET /task -> lista todos
router.get('/', taskController.task_list);

// POST /task -> crea uno
router.post('/', taskController.task_create);

// GET /task/:id/download -> descarga el archivo asociado a la tarea
router.get('/:id/download', taskController.task_download);

// DELETE /task/:id/file -> elimina el archivo asociado a la tarea
router.delete('/:id/file', taskController.task_delete_file);

// GET /task/:id -> obtiene uno
router.get('/:id', taskController.task_detail);

// PUT /task/:id -> actualiza uno
router.put('/:id', taskController.task_update);

// PATCH /task/:id -> actualiza parcialmente
router.patch('/:id', taskController.task_patch);

// DELETE /task/:id -> elimina uno
router.delete('/:id', taskController.task_delete);

router.post('/:id/upload', upload.single('file'), taskController.task_upload);

module.exports = router;
