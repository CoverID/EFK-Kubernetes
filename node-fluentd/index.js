const express = require("express");
const FluentClient = require("@fluent-org/logger").FluentClient;
const app = express();

const logger = new FluentClient("node-app", {
  socket: {
    host: "fluentd-fluentd-elasticsearch-forward",
    port: 24224,
    timeout: 3000,
  },
});

app.get("/", function (req, res) {
  let obj = {
    endpoints: ["/ping", "/current-date", "/fibo/:n"],
  };
  logger.emit("home", obj);
  res.send(obj);
});

app.get("/ping", function (req, res) {
  logger.emit("/ping");
  res.send("pong");
});

app.get("/current-date", function (req, res) {
  let obj = {
    name: "current",
    value: new Date(),
  };
  logger.emit("/current-date", obj);
  res.send(obj);
});

app.get("/fibo/:n", function (req, res) {
  let obj = {
    name: "fibo",
    value: fibo(req.params.n),
  };
  logger.emit("/fibo", obj);
  res.send(obj);
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

function fibo(n) {
  // 1
  if (n < 2) return 1;
  else return fibo(n - 2) + fibo(n - 1);
}
