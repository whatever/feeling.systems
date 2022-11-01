import {whoami} from "./whoami.js";
import message from "./feeling-systems.txt";
import {expand, write} from "./utils.js";


console.log(message);


const DEBUG = false;


let lastTouch = {};


/**
 * Update Scale of Distortion Map
 *
 * ...
 */
function updateScale(t) {
  let dis = document.getElementById("displacey");

  if (!dis) {
    return;
  }

  if (t === undefined || t < 0) {
    return;
  }

  if (dis === undefined) {
    return;
  }

  let speed = 26.0/60.0/60.0/24.0;
  let now = +new Date()/1000.0;
  let scale = (now - t)*speed + 2.0;

  dis.scale.baseVal = Math.min(scale, 80.0);
}

/**
 * Update  DOM
 *
 * ...
 */
function update() {
  write(expand(lastTouch.message || ""));

  const HIDE_CLASS = "hidden";

  let messageBox = document.getElementById("message-box");

  if (!messageBox) {
    return;
  }

  messageBox.className = (!DEBUG && lastTouch.who === whoami()) ? HIDE_CLASS : "";

  let messageBoxContainer = document.getElementById("message-box-container");
  messageBoxContainer.className = (!DEBUG && lastTouch.who === whoami()) ? HIDE_CLASS : "";

  document.body.className = lastTouch.who === whoami() ? "unrequited" : "requited";
  document.documentElement.className = lastTouch.who === whoami() ? "unrequited" : "requited";
}


/**
 * Connect Websocket
 * 
 * Connect, Register Listener, Attempt to reopen on failure
 */
function ConnectWebsocket() {

  let url = location.origin.replace("http", "ws") + "/holding";

  let ws = new WebSocket(url);

  ws.addEventListener("open", (ev) => {
    console.log("[open] websocket as " + whoami());
    ws.send(whoami());
  });

  ws.addEventListener("message", (ev) => {
    lastTouch = JSON.parse(ev.data);
    console.log("[message] received from " + lastTouch.who);
    update();
  });

  ws.addEventListener("error", (err) => {
    console.log("[error] " + err);
  });

  ws.addEventListener("close", (ev) => {
    if (ev.code !== 1000 && ev.code !== 1001) {
      console.log("[close]", ev);
      setTimeout(ConnectWebsocket, 1000);
    }
  });
}

/**
 * Handle Submit
 *
 * ...
 */
function handleSubmit(ev) {
  ev.preventDefault();

  let el = document.getElementById("message");

  let payload = {
    who: whoami(),
    message: el.value || "",
    nonce: "nvm",
  };

  // Touch

  fetch("/touch", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
  }).then((text) => {
    return text.json();
  }).then((resp) => {
    console.log("[submit] success");
  }).catch((err) => {
    console.log("[submit] fail");
    console.error(err);
  });

  document.activeElement.blur();
  document.getElementById("message").value = "";
  window.scrollTo(0, 0);

  return false;
}

window.addEventListener("load", () => {
  let url = location.origin.replace("http", "ws") + "/holding";
  document.getElementById("write-a-message").addEventListener("submit", handleSubmit);
  ConnectWebsocket();
  (function loopUpdateScale() {
    requestAnimationFrame(loopUpdateScale);
    updateScale(lastTouch.when);
  }());
});
