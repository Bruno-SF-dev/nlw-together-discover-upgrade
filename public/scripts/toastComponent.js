const toastComponent = document.createElement("div");

const enterToast = () => {
  toastComponent.classList.add("enter");
};

const outToast = () => {
  toastComponent.classList.remove("enter");
};

export const addToast = (message, error) => {
  return new Promise((resolve, reject) => {
    const classes = error ? "toast error" : "toast";

    toastComponent.innerText = message;
    toastComponent.setAttribute("class", classes);
    document.body.append(toastComponent);

    setTimeout(() => {
      enterToast();
      resolve();
    }, 200);
  });
};

export const removeToast = (delayOut) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      outToast();

      setTimeout(() => {
        toastComponent.remove();
        resolve();
      }, 200);
    }, delayOut);
  });
};
