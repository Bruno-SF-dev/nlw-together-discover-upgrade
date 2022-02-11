const roomCodeButton = document.getElementById("room-id");
const roomCode = roomCodeButton.dataset.id;

const getRoomCode = () => {
  navigator.clipboard.writeText(roomCode);
};

roomCodeButton.addEventListener("click", getRoomCode);
