import { Toast } from "./toastComponent.js";

const roomCodeButton = document.getElementById("room-id");
const roomCode = roomCodeButton.dataset.id;

const getRoomCode = async () => {
  navigator.clipboard.writeText(roomCode);

  const ConfirmCodeToast = new Toast("Código copiado!", "success");
  await ConfirmCodeToast.showToast();
};

roomCodeButton.addEventListener("click", getRoomCode);
