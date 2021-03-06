// var apm = require('elastic-apm-node').start({
//   serviceName: 'NodeAPMTester',
//   secretToken: 'YXJKWWtOVFVLZjY0T0V4RDl5Rm5HdThWQVNnMlJMTUhRMXczb3FsYmpocEJlczcwV0l6bXRYWnZQNUNkaWM=',
//   serverUrl: 'http://host:8200',
//   environment: 'production'
// })

const express = require("express");
const axios = require("axios");
const app = express();
const defaultRoute = "/test";

// const FluentClient = require("@fluent-org/logger").FluentClient;
// const logger = new FluentClient("node-app", {
//   socket: {
//     host: "fluentd-fluentd-elasticsearch-forward",
//     port: 24224,
//     timeout: 3000,
//   },
// });

app.get(`${defaultRoute}`, function (req, res) {
  let obj = {
    endpoints: ["/ping", "/current-date", "/fact"],
  };
  // logger.emit("/home", obj);
  res.send(obj);
});

app.get(`${defaultRoute}/ping`, function (req, res) {
  // logger.emit("/ping", {});
  res.send("pong");
});

app.get(`${defaultRoute}/current-date`, function (req, res) {
  let obj = {
    name: "current",
    value: new Date(),
  };
  // logger.emit("/current-date", obj);
  res.send(obj);
});

app.get(`${defaultRoute}/fact`, function (req, res) {
  axios
    .get("http://catfact.ninja/fact")
    .then((response) => {
      res.send(response.data.fact);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
