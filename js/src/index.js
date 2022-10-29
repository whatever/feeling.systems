import {whoami} from "./whoami.js";
import message from "./feeling-systems.txt";


console.log(message);


const DEBUG = false;


/**
 * expand
 * Return a list of strings from a text blob.
 */
function expand(text) {
  let textarea = document.getElementById("message");
  let ncols = textarea.cols;
  let res = [];
  text.split("\n").forEach((line) => {
    while (line.length > ncols) {
      res.push(line.slice(0, ncols));
      line = line.slice(ncols);
    }
    res.push(line);
  });
  return res.slice(0, 6);
}


/**
 * write
 * Replace svg text with multiple lines from an array of strings.
 */
function write(lines) {
  let textMeSoHard = document.getElementById("text-me-so-hard");
  textMeSoHard.innerHTML = "";
  lines.forEach((line, i) => {
    let x = 0;
    let y = (i+1)*100;
    let el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    el.setAttribute("x", "0");
    el.setAttribute("y", y.toString());
    el.setAttribute("xml:space", "preserve");
    el.textContent = line;
    textMeSoHard.appendChild(el);
  });
}

let lastTouch = {};

function updateScale(t) {
  let dis = document.getElementById("displacey");

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

(function loopUpdateScale() {
  requestAnimationFrame(loopUpdateScale);
  updateScale(lastTouch.when);
}());


let textMeOSoHard = undefined;


// update
//
// Update DOM
function update() {
  write(expand(lastTouch.message || ""));

  let messageBox = document.getElementById("message-box");
  messageBox.className = (!DEBUG && lastTouch.who === whoami()) ? "hidden" : "";

  let closer = document.getElementById("closer");
  closer.className = (!DEBUG && lastTouch.who === whoami()) ? "hidden" : "";

  document.body.className = lastTouch.who === whoami() ? "unrequited" : "requited";
}


// connect
// connect
// connect
function connect() {

  let url = location.origin.replace("http", "ws") + "/holding";

  let ws = new WebSocket(url);

  ws.addEventListener("open", (ev) => {
    console.log("opened websocket");
    // ws.send(whoami());
  });

  ws.addEventListener("message", (ev) => {
    console.log("received!");
    lastTouch = JSON.parse(ev.data);
    update();
  });

  ws.addEventListener("error", (ev) => {
    console.log("error:", ev);
  });

  ws.addEventListener("close", (ev) => {
    console.log("closing...");
    setTimeout(connect, 1000);
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
    console.log("submit succeeded");
  }).catch((err) => {
    console.log("submit failed");
    console.error(err);
  });

  document.activeElement.blur();
  document.getElementById("message").value = "";
  window.scrollTo(0, 0);

  return false;
}

/**
 * XXX: 
function cascade(string) {
  let lines = string.split("\n");

  let res = [];

  lines.forEach((line) => {
    console.log(line.match(/.{1,12}/g));
  });

  console.log(lines);

  return "";
}
*/

window.addEventListener("load", () => {

  textMeOSoHard = document.getElementById("text-me-so-hard");

  let form = document.getElementById("write-a-message");
  form.addEventListener("submit", handleSubmit);

  connect();

  console.log("id ....... " + whoami());
});
