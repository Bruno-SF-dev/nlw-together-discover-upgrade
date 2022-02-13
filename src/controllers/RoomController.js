const Database = require("../db/config.js");

module.exports = {
  async create(req, res) {
    const db = await Database();
    const pass = req.body.password;
    let roomId;
    let isRoom = true;

    while (isRoom) {
      /*--- Gerar código da sala ---*/
      for (var i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString());
      }

      /*-- Verificar se o código já existe --*/ /* SELECT busca/seleciona os dados no banco */
      const roomsExistIds = await db.all(`SELECT id FROM rooms`); // retorna um array de objetos
      isRoom = roomsExistIds.some((roomExistId) => roomExistId.id === roomId);

      if (!isRoom) {
        /*-- Inserir a nova sala no banco --*/
        await db.run(`
          INSERT INTO rooms (
            id,
            pass
          )
          VALUES (
            ${parseInt(roomId)},
            ${pass}
          )
        `);
      }
    }

    await db.close();

    res.redirect(`/room/${roomId}`);
  },

  async open(req, res) {
    const db = await Database();
    const roomId = req.params.roomId;
    let isNoQuestions = false;

    const roomIdExist = await db.all(
      `SELECT * FROM rooms WHERE id = ${roomId}`,
    );

    if (roomIdExist.length == 0) {
      req.flash("error", "A sala pesquisada não existe.");
      res.redirect("/");
      return;
    }

    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 0`,
    );

    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 1`,
    );

    if (questions.length == 0 && questionsRead == 0) {
      isNoQuestions = true;
    }

    res.render("room", {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNoQuestions: isNoQuestions,
      incorrectPass: req.flash("incorrectPass"),
    });
  },

  async enter(req, res) {
    const db = await Database();
    const roomId = req.body.roomId;

    if (!roomId) {
      req.flash("error", "Insira o código sala.");
      res.redirect("/");
      return;
    }

    const roomIdExist = await db.all(
      `SELECT * FROM rooms WHERE id = ${roomId}`,
    );

    if (roomIdExist.length == 0) {
      req.flash("error", "A sala pesquisada não existe.");
      res.redirect("/");
      return;
    }

    res.redirect(`/room/${roomId}`);
  },
};
