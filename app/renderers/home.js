const remote = require('@electron/remote')
const authService = remote.require("./services/auth-service");
const authProcess = remote.require("./main/auth-process");
const axios = require("axios");
const webContents = remote.getCurrentWebContents();

let duration = 0;
let interval = null;
let secondContainer;
let minuteContainer;
let hourContainer;

function startCounting() {
  duration++;

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const seconds = duration % 60;

  secondContainer.innerHTML = seconds < 10 ? "0" + seconds : seconds;
  minuteContainer.innerHTML = minutes < 10 ? "0" + minutes : minutes;
  hourContainer.innerHTML = hours < 10 ? "0" + hours : hours;
}

webContents.on("dom-ready", () => {
  const profile = authService.getProfile();
  console.log(profile)
  document.getElementById("picture").src = profile.picture;
  document.getElementById("name").innerText = profile.name;
  // document.getElementById("success").innerText =
  //   "You successfully used OpenID Connect and OAuth 2.0 to authenticate.";

  const start = document.getElementById("btn_start");
  const pause = document.getElementById("btn_pause");
  const reset = document.getElementById("btn_reset");
  secondContainer = document.getElementById("t_s");
  minuteContainer = document.getElementById("t_m");
  hourContainer = document.getElementById("t_h");
  start.addEventListener("click", () => {
    interval = setInterval(startCounting, 1000);
    start.disabled = true;
    pause.disabled = false;
    reset.disabled = false;
  });

  pause.addEventListener("click", () => {
    clearInterval(interval);
    start.disabled = false;
    pause.disabled = true;
    reset.disabled = false;
  });

  reset.addEventListener("click", () => {
    clearInterval(interval);
    start.disabled = false;
    pause.disabled = true;
    reset.disabled = true;

    minuteContainer.innerHTML = "00";
    hourContainer.innerHTML = "00";
    secondContainer.innerHTML = "00";

    let config = {
      headers: {
        Authorization:
          `Bearer ${authService.getAccessToken()}`
      },
    };

    axios
      .post("http://localhost:3333/api/duration", { duration }, config)
      .then((res) => {
        console.log(res);
        duration = 0;
      })
      .catch((err) => console.error(err));
  });
});

document.getElementById("logout").onclick = () => {
  authProcess.createLogoutWindow();
  remote.getCurrentWindow().close();
};

