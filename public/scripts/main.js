import Modal from "./modal.js";

const modal = Modal();
// a constante modal (e consequentemente, este módulo, main.js) passa a ter todas as propriedades e funcionalidades que a função Modal retorna

//---- elementos do modal ----//
const modalTitle = document.querySelector(".modal h2");
const modalDescription = document.querySelector(".modal p");
const modalForm = document.querySelector(".modal form");
const modalConfirmButton = document.querySelector(
  ".modal .buttons button.confirm"
);

function handleClick(event, check = true) {
  // ID da sala
  const roomId = document.querySelector("#room-id").dataset.id;
  // slug da ação
  const slug = check ? "check" : "delete";
  // ID da questão selecionada
  const questionId = event.target.getAttribute("data-id");

  modalTitle.innerHTML = check
    ? "Marcar pergunta como lida"
    : "Excluir pergunta";

  modalDescription.innerHTML = check
    ? "Tem certeza que deseja marcar como lida esta pergunta?"
    : "Tem certeza que deseja excluir esta pergunta?";

  modalConfirmButton.innerHTML = check
    ? "Sim, marcar como lida"
    : "Sim, excluir";

  modalForm.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`);

  check
    ? modalConfirmButton.classList.remove("red")
    : modalConfirmButton.classList.add("red");

  modal.open();
}

//---- botão "Marcar como lido" ----//
const checkButtons = document.querySelectorAll(".actions button.check");

checkButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

//---- botão "Excluir" ----//
const deleteButtons = document.querySelectorAll(".actions button.delete");

deleteButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    handleClick(event, false);
  });
});
