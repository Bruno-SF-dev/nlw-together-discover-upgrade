import { addToast, removeToast } from "./toastComponent.js";

const roomCodeButton = document.getElementById("room-id");
const roomCode = roomCodeButton.dataset.id;

const getRoomCode = async () => {
  navigator.clipboard.writeText(roomCode);

  await addToast("Código copiado!");
  await removeToast(3000);
};

roomCodeButton.addEventListener("click", getRoomCode);
