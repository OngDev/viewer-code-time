const { remote } = require("electron");
const authService = remote.require("./services/auth-service");
const authProcess = remote.require("./main/auth-process");
const axios = require("axios");
const webContents = remote.getCurrentWebContents();

webContents.on("dom-ready", () => {
  const profile = authService.getProfile();
  console.log(profile)
  // document.getElementById("picture").src = profile.picture;
  // document.getElementById("name").innerText = profile.name;
  // document.getElementById("success").innerText =
  //   "You successfully used OpenID Connect and OAuth 2.0 to authenticate.";
});
let duration = 0;
let interval = null;
let secondContainer;
let minuteContainer;
let hourContainer;
window.onload = function () {
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
          "Bearer " +
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJDc0dtTW5hZ1phejgxVlVyWWVjNiJ9.eyJpc3MiOiJodHRwczovL2Rldi1rYTEzYjVpMy51cy5hdXRoMC5jb20vIiwic3ViIjoiZ2l0aHVifDYzODE1MDI1IiwiYXVkIjpbImh0dHBzOi8vbG9jYWxob3N0OjMwMDEiLCJodHRwczovL2Rldi1rYTEzYjVpMy51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjQwNzA1NDY4LCJleHAiOjE2NDA3OTE4NjgsImF6cCI6IkJaNVR2dzFpUHM2WFNrdjhud3BObzZXNTloQ1ZCY29JIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.JswlQZaTye1OtXe3fL8agxcS53H06Ai7ZRX2ryV3khK7gXevqtjNq2hy9Xe4HGz714ungARarFtgLIIksgE2sxS5eKuRTTEI2sNhruUKDW9-WQeb-PAA3kntUigcpHERigVOh7IiPFHiie8wVCvulKicJmF0ksJI-G67BATOVw-jYsYBR-fz_Z1ZDGulCjB5v-DOpDXfnbQoGnsOs963rBUS_UznQdwkrOTIs3WocMy6bq2-46QaSGUgVSYgYfrJztZ2IMNZ7IfzjVmmLpRAeuyHlEDl881UqhOeKNXVL04DvdTlGvYkHwqPYu7pb6ngC2KcYnBknszhj0OuwSE7Ug",
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
};
function startCounting() {
  duration++;

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const seconds = duration % 60;

  secondContainer.innerHTML = seconds < 10 ? "0" + seconds : seconds;
  minuteContainer.innerHTML = minutes < 10 ? "0" + minutes : minutes;
  hourContainer.innerHTML = hours < 10 ? "0" + hours : hours;
}
