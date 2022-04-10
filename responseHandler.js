const { headers } = require('./libs');

const successHandler = (res, data) => {
  res.writeHead(200, headers);
  res.write(JSON.stringify({
    status: 'success',
    data,
  }));
  res.end();
};

const errorHandler = (res, statusCode, message) => {
  res.writeHead(statusCode, headers);
  res.write(JSON.stringify({
    status: 'fail',
    message,
  }));
  res.end();
};

module.exports = {
  successHandler,
  errorHandler,
};