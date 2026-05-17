const fs = require('fs');
const path = require('path');

const todoPath = path.join(__dirname, 'views', 'todo');
const taskPath = path.join(__dirname, 'views', 'task');

if (fs.existsSync(todoPath)) {
  fs.renameSync(todoPath, taskPath);
  console.log('Renamed views/todo to views/task');
} else {
  console.log('views/todo does not exist');
}
