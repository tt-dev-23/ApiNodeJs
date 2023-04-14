const express = require("express");
const { getJsonData, addJsonData } = require("./supabase.js");

const app = express();

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/get/:id", function (request, response) {
  const id = request.params.id;

  if (id.length > 6) {
    response.json({ error: "error" });
  } else {
    getJsonData(id).then(function (data) {
      response.json(data);
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
