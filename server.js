
const http = require('http');
const libs = require('./libs');
const { errorHandler } = require('./responseHandler');
const { getTodos, getTodo } = require('./getTodo');
const postTodo = require('./postTodo');
const patchTodo = require('./patchTodo');
const { deleteTodos, deleteTodo } = require('./deleteTodo');

let todos = [];

const requestListener = (req, res) => {
  const { url, method } = req;  
  const { headers, message } = libs;

  const data = {
    req,
    res,
    todos,
  };

  if (url === '/todos' && method === 'GET') {
    // 取得所有代辦事項
    getTodos(data);
  } else if (url.startsWith('/todos/') && method === 'GET') {
    // 取得單筆代辦事項
    getTodo(data);
  } else if (url === '/todos' && method === 'POST') {
    // 新增代辦事項
    postTodo(data);
  } else if (url === '/todos' && method === 'DELETE') {
    // 刪除所有代辦事項
    deleteTodos(data);
  } else if (url.startsWith('/todos/') && method === 'DELETE') {
    // 刪除單筆代辦事項
    deleteTodo(data);
  } else if (url.startsWith('/todos/') && method === 'PATCH') {
    // 修改單筆代辦事項
    patchTodo(data);
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else {
    errorHandler(res, 404, message[404]);
  }
};

const server = http.createServer(requestListener);

server.listen(process.env.PORT || 3005);