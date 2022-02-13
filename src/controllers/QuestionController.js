const Database = require("../db/config");

module.exports = {
  async index(req, res) {
    const db = await Database();
    const roomId = req.params.roomId;
    const questionId = req.params.questionId;
    const action = req.params.action;
    const password = req.body.password; // .password, pois "password" é o "name" do input do qual queremos o valor no form

    /* Verificar se a senha está correta */
    const verifyRoom = await db.get(`SELECT * from rooms WHERE id = ${roomId}`);

    if (verifyRoom.pass === password) {
      if (action === "delete") {
        await db.run(`DELETE FROM questions WHERE id = ${questionId}`);
      } else if (action === "check") {
        await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`);
      }
    } else {
      req.flash("incorrectPass", "incorrectPass");
    }

    return res.redirect(`/room/${roomId}`);
  },

  async create(req, res) {
    const db = await Database();

    const question = req.body.question;
    const roomId = req.params.roomId;

    if (!question.trim()) {
      req.flash("error", "Digite sua pergunta.");
      res.redirect(`/room/${roomId}`);
      return;
    }

    await db.run(`
      INSERT INTO questions(
        room,
        title,
        read
      )
      VALUES(
        ${roomId},
        "${question}",
        0
      )
    `);

    res.redirect(`/room/${roomId}`);
  },
};
