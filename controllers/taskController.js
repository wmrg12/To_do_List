const Task = require("../models/task");

const renderOrJson = (req, res, view, data, metadata, links, errors = null, status = 200) => {
  res.format({
    html: () => {
      res.status(status).render(view, data);
    },
    json: () => {
      res.status(status).json({
        metadata,
        data: data.data,
        links,
        errors
      });
    },
    default: () => {
      res.status(status).json({
        metadata,
        data: data.data,
        links,
        errors
      });
    }
  });
};

exports.task_list = async (req, res, next) => {
  if (req.query.action === 'create') {
    return res.render('task/create', { title: 'Crear nueva tarea' });
  }

  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    renderOrJson(
      req, res, 'task/list',
      { title: 'Tareas', data: tasks },
      { version: '1.0' },
      { self: '/task' }
    );
  } catch (error) {
    renderOrJson(
      req, res, 'error',
      { message: error.message, error, data: null },
      { version: '1.0' },
      { self: '/task' },
      [{ message: error.message }],
      500
    );
  }
};

exports.task_detail = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      const err = new Error('Tarea no encontrada');
      err.status = 404;
      throw err;
    }

    if (req.query.action === 'update') {
      return res.render('task/update', { title: 'Actualizar Tarea', data: task });
    }
    if (req.query.action === 'delete') {
      return res.render('task/delete', { title: 'Eliminar Tarea', data: task });
    }

    renderOrJson(
      req, res, 'task/detail',
      { title: task.title, data: task },
      { version: '1.0' },
      { self: `/task/${task._id}`, collection: '/task' }
    );
  } catch (error) {
    // If CastError, it's an invalid ID format (e.g. they typed /create)
    const status = error.name === 'CastError' ? 404 : (error.status || 500);
    renderOrJson(
      req, res, 'error',
      { message: error.name === 'CastError' ? 'Tarea no encontrada' : error.message, error, data: null },
      { version: '1.0' },
      { self: `/task/${req.params.id}` },
      [{ message: error.message }],
      status
    );
  }
};

exports.task_create_get = (req, res, next) => {
  res.render('task/create', { title: 'Crear nueva tarea' });
};

exports.task_create = async (req, res, next) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed === 'true' || req.body.completed === true
    });
    const savedTask = await task.save();
    renderOrJson(
      req, res, 'task/detail',
      { title: savedTask.title, data: savedTask },
      { version: '1.0' },
      { self: `/task/${savedTask._id}`, collection: '/task' },
      null,
      201
    );
  } catch (error) {
    renderOrJson(
      req, res, 'error',
      { message: error.message, error, data: null },
      { version: '1.0' },
      { self: '/task' },
      [{ message: error.message }],
      400
    );
  }
};

exports.task_update_get = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      const err = new Error('Tarea no encontrada');
      err.status = 404;
      throw err;
    }
    res.render('task/update', { title: 'Actualizar Tarea', data: task });
  } catch (error) {
    next(error);
  }
};

exports.task_update = async (req, res, next) => {
  try {
    const taskData = {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed === 'true' || req.body.completed === true
    };
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, taskData, { new: true });
    if (!updatedTask) {
      const err = new Error('Tarea no encontrada');
      err.status = 404;
      throw err;
    }
    renderOrJson(
      req, res, 'task/detail',
      { title: updatedTask.title, data: updatedTask },
      { version: '1.0' },
      { self: `/task/${updatedTask._id}`, collection: '/task' }
    );
  } catch (error) {
    const status = error.status || 400;
    renderOrJson(
      req, res, 'error',
      { message: error.message, error, data: null },
      { version: '1.0' },
      { self: `/task/${req.params.id}` },
      [{ message: error.message }],
      status
    );
  }
};

exports.task_delete_get = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      const err = new Error('Tarea no encontrada');
      err.status = 404;
      throw err;
    }
    res.render('task/delete', { title: 'Eliminar Tarea', data: task });
  } catch (error) {
    next(error);
  }
};

exports.task_delete = async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      const err = new Error('Tarea no encontrada');
      err.status = 404;
      throw err;
    }

    res.format({
      html: () => {
        res.redirect('/task');
      },
      json: () => {
        res.status(200).json({
          metadata: { version: '1.0' },
          data: deletedTask,
          links: { collection: '/task' },
          errors: null
        });
      },
      default: () => {
        res.status(200).json({
          metadata: { version: '1.0' },
          data: deletedTask,
          links: { collection: '/task' },
          errors: null
        });
      }
    });
  } catch (error) {
    const status = error.status || 500;
    renderOrJson(
      req, res, 'error',
      { message: error.message, error, data: null },
      { version: '1.0' },
      { self: `/task/${req.params.id}` },
      [{ message: error.message }],
      status
    );
  }
};


