const  { v4: uuidv4 } = require('uuid');
const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs');

const postTodo = data => {
  const { req, res, todos } = data;

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    const { formatFail, wrongColumn } = message;
    try {
      const { title } = JSON.parse(body);
      if (title !== undefined) {
        const todo = {
          title,
          id: uuidv4(),
        };
        todos.push(todo);
        successHandler(res, todos);
      } else {
        errorHandler(res, 400, wrongColumn);
      }
    } catch (error) {
      errorHandler(res, 400, `${formatFail}，新增失敗`);
    }
  });
};

module.exports = postTodo;