const express = require("express");
const { getJsonData } = require("./supebase.js");
const { addJsonData } = require("./supebase.js");

const app = express();

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/get/:id", function (request, response) {
  let id = request.params.id;

  if (id.length > 6) {
    response.json({ error: "error" });
  } else {
    getJsonData(id).then(function (data) {
      if (data.length) {
        response.json(data[0]["data"]);
      } else {
        response.json({ error: "no object with this id" });
      }
    });
  }
});

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: true, limit: "1mb" });

app.post("/", urlencodedParser, function (request, response) {
  if (!request.body) {
    return response.sendStatus(400);
  }
  addJsonData(request.body);
  response.send(`${request.body}`);
});

app.listen(3000, () => console.log("Server run..."));
