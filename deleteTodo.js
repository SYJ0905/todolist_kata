const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs');

const deleteTodos = data => {
  const { res, todos } = data;
  todos.length = 0;
  successHandler(res, todos);
};

const deleteTodo = data => {
  const { req, res, todos } = data;
  const { noData } = message;

  try {
    const id = req.url.split('/').pop();
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      successHandler(res, todos);
    } else {
      errorHandler(res, 400, noData);
    }
  } catch (error) {
    errorHandler(res, 400, error.message);
  }
};

module.exports = {
  deleteTodos,
  deleteTodo,
};