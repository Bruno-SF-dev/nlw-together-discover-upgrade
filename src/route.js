const express = require("express");
const QuestionController = require("./controllers/QuestionController");
const RoomController = require("./controllers/RoomController");

const route = express.Router();

route.get("/", (req, res) =>
  res.render("index", { page: "enter-room", error: req.flash("error") }),
);
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
