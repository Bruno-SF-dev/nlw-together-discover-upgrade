const express = require("express");
const QuestionController = require("./controllers/QuestionController");
const RoomController = require("./controllers/RoomController");

// a constante route passa a ter todas as funcionalidades de rotas que o express disponibiliza
const route = express.Router();

route.get("/", (req, res) => res.render("index", { page: "enter-room" })); // { page: "enter-room" }: passando uma variável "page"
route.get("/create-pass", (req, res) =>
  res.render("index", { page: "create-pass" })
);

route.post("/create-room", RoomController.create);
route.get("/room/:roomId", RoomController.open);
route.post("/enterRoom", RoomController.enter);

route.post("/question/:roomId/:questionId/:action", QuestionController.index);
route.post("/question/create/:roomId", QuestionController.create);

// implicitamente, o (req, res) já está sendo passado para os controller chamado
module.exports = route;
