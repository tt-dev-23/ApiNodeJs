const express = require("express");
const { getJsonData, addJsonData } = require("./supabase.js");

const app = express();

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/get", function (request, response) {
  response.send(
    "Укажите уникальный id в get запросе. \nНапример, localhost:3000/get/1S2axx"
  );
});

app.get("/generate", function (request, response) {
  response.sendFile(__dirname + "/post.html");
});

app.get("/get/:id", function (request, response) {
  const id = request.params.id;

  if (id.length > 6) {
    response.json({ status: 400, error_message: "incorrect id" });
  } else {
    getJsonData(id).then(function (data) {
      response.json(data);
    });
  }
});

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: true, limit: "1mb" });

app.post("/generate", urlencodedParser, function (request, response) {
  if (!request.body) {
    return response.sendStatus(400);
  }

  addJsonData(request.body)
    .then(function (data) {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
});

app.listen(3000, () => console.log("Server run..."));
