const express = require("express");

const app = express();

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/get/:id", function (request, response) {
  let id = request.params.id;

  if (id.length > 6) {
    response.send(`<h1>Ошибка</h1>`);
  } else {
    response.send(`<h1>${id}</h1>`);
  }
});

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: true, limit: "1mb" });

app.post("/", urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);
  console.log(request.body);
  response.send(`${request.body.idJson}`);
});

app.listen(3000, () => console.log("Server run..."));
