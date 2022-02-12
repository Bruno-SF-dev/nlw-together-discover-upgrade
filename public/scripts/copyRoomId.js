const roomCodeButton = document.getElementById("room-id");
const roomCode = roomCodeButton.dataset.id;
const toast = document.getElementById("toast");

const toastComponent = document.createElement("div");
toastComponent.innerText = "Código copiado!";
toastComponent.setAttribute("class", "toast");

const getRoomCode = () => {
  console.log("CHAMOU");
  navigator.clipboard.writeText(roomCode);

  document.body.append(toastComponent);
  setTimeout(() => {
    toastComponent.remove();
  }, 2000);
};

roomCodeButton.addEventListener("click", getRoomCode);
