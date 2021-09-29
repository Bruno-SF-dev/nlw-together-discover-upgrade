const express = require("express");
const route = require("./route");
const path = require("path");

const server = express();

server.set("view engine", "ejs");

server.set("views", path.join(__dirname, "views"));
// path = .../nlw-together-discover
// __dirname = src/

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true })); // decodifica o que vem do form, pela rota, e passa pro controller

server.use(route);

server.listen(3000, () => {
  console.log("Rodando");
});
