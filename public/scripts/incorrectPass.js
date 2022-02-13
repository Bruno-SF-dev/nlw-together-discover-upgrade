import { addToast, removeToast } from "./toastComponent.js";

const showError = async () => {
  await addToast("Senha incorreta", true);
  await removeToast(3000);
};

showError();
