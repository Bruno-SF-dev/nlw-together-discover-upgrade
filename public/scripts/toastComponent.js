export class Toast {
  constructor(message, status) {
    {
      this.message = message;
      this.status = status;
      this.toastComponent = document.createElement("div");
    }
  }

  showToast = async () => {
    await this.addToast();
    await this.removeToast();
  };

  enterToast = () => {
    this.toastComponent.classList.add("enter");
  };

  outToast = () => {
    this.toastComponent.classList.remove("enter");
  };

  addToast = () => {
    return new Promise((resolve, reject) => {
      const classes = `toast ${this.status}`;

      this.toastComponent.innerText = this.message;
      this.toastComponent.setAttribute("class", classes);
      document.body.append(this.toastComponent);

      setTimeout(() => {
        this.enterToast();
        resolve();
      }, 200);
    });
  };

  removeToast = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.outToast();

        setTimeout(() => {
          this.toastComponent.remove();
          resolve();
        }, 200);
      }, 3000);
    });
  };
}
