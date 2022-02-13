const express = require("express");
const route = require("./route");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const { errorsMiddleware } = require("./middlewares/globalMiddleware");

const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
// path = .../nlw-together-discover
// __dirname = src/

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true })); // decodifica o que vem do form, pela rota, e passa pro controller

server.use(
  session({
    secret: "hssiq zmznxoa",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  }),
);

server.use(flash());
server.use(errorsMiddleware);
server.use(route);

server.listen(3000, () => {
  console.log("Rodando");
});
