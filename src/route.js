const express = require("express");
const QuestionController = require("./controllers/QuestionController");
const RoomController = require("./controllers/RoomController");

const route = express.Router();

// enter-room
route.get("/", (req, res) => res.render("index", { page: "enter-room" }));
route.post("/", RoomController.enter);

// create-room
route.get("/create-pass", (req, res) =>
  res.render("index", { page: "create-pass" }),
);
route.post("/create-room", RoomController.create);

// room
route.get("/room/:roomId", RoomController.open);

// questions
route.post("/question/:roomId/:questionId/:action", QuestionController.index);
route.post("/question/create/:roomId", QuestionController.create);

// 404
route.get("*", (req, res) => {
  res.status(404);
  res.render("notFound");
});

route.post("*", (req, res) => {
  res.status(404);
  res.render("notFound");
});

module.exports = route;
