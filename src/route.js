const express = require("express");
const QuestionController = require("./controllers/QuestionController");
const RoomController = require("./controllers/RoomController");

// a constante route passa a ter todas as funcionalidades de rotas que o express disponibiliza
const route = express.Router();

route.get("/", (req, res) =>
  res.render("index", { page: "enter-room", error: req.flash("error") }),
); // { page: "enter-room" }: passando uma variável "page"
route.get("/create-pass", (req, res) =>
  res.render("index", { page: "create-pass" }),
);

route.post("/create-room", RoomController.create);
route.get("/room/:roomId", RoomController.open);
route.post("/", RoomController.enter);

route.post("/question/:roomId/:questionId/:action", QuestionController.index);
route.post("/question/create/:roomId", QuestionController.create);

route.get("*", (req, res) => {
  res.status(404);
  res.render("notFound");
});

module.exports = route;
