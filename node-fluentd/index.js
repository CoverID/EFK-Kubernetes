const express = require('express');
const FluentClient = require('@fluent-org/logger').FluentClient;
const app = express();

const logger = new FluentClient('fluentd.test', {
  socket: {
    host: 'fluentd-fluentd-elasticsearch-forward',
    port: 24224,
    timeout: 3000, // 3 seconds
  }
});

// var logger = require('express-fluent-logger');

// app.use(logger('node-app', { host: 'fluentd-fluentd-elasticsearch-forward', port: 24224, timeout: 3.0, responseHeaders: ['x-userid'] }));

app.get('/', function (req, res) {
  let obj = {
    endpoints: [
      "/ping",
      "/current-date",
      "/fibo/:n",
    ]
  };
  res.send(obj);
});

app.get('/ping', function (req, res) {
  res.send("pong");
});


app.get('/current-date', function (req, res) {
  let obj = {
    name: "current",
    value: new Date()
  };
  res.send(obj);
});

app.get('/fibo/:n', function (req, res) {
  let obj = {
    name: "fibo",
    value: fibo(req.params.n)
  };
  res.send(obj);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


function fibo(n) { // 1
  if (n < 2)
    return 1;
  else   return fibo(n - 2) + fibo(n - 1);
}