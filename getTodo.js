const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs');

const getTodos = data => {
  const { res, todos } = data;
  successHandler(res, todos);
};

const getTodo = data => {
  const { req, res, todos } = data;
  const id = req.url.split('/').pop();
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    successHandler(res, todos[index]);
  } else {
    const { noData } = message;
    errorHandler(res, 400, noData);
  }
};

module.exports = {
  getTodos,
  getTodo,
};