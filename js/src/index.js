import message from "./feeling-systems.txt";

console.log(message);


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
  return res;
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

  let speed = 1.0/60.0/24.0;
  speed = 20.0;
  let now = +new Date()/1000.0;
  let scale = (now - t)*speed;
  dis.scale.baseVal = Math.min(scale, 80.0);
}

(function loopUpdateScale() {
  requestAnimationFrame(loopUpdateScale);
  updateScale(lastTouch.when);
}());


let self = undefined;


let textMeOSoHard = undefined;


// update
//
// Update DOM
function update() {
  write(expand(lastTouch.message));
  let messageBox = document.getElementById("message-box");
  messageBox.className = lastTouch.last === self ? "hidden" : "";
}


window.addEventListener("load", () => {

  textMeOSoHard = document.getElementById("text-me-so-hard");

  let form = document.getElementById("write-a-message");

  // Attach submit event listener
  form.addEventListener("submit", (ev) => {

    ev.preventDefault();

    let el = document.getElementById("message");

    let payload = {
      message: el.value || "",
      nonce: "nvm",
    };

    // Touch

    fetch("/touch", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    }).then((text) => {
      return text.json();
    }).then((resp) => {
      lastTouch = resp;
    });

    return false;
  });

  // Who am I?

  fetch("/whoami")
    .then(function (res) {
      return res.text();
    })
    .then(function (text) {
      self = JSON.parse(text).last;
    });


  let url = location.origin.replace("http", "ws") + "/holding";

  let ws = new WebSocket(url);

  ws.addEventListener("open", (ev) => {
    console.log("open =", ev);
  });

  ws.addEventListener("close", (ev) => {
    console.log("close =", ev);
  });

  ws.addEventListener("message", (ev) => {
    lastTouch = JSON.parse(ev.data);
    update();
  });

  ws.addEventListener("error", (ev) => {
    console.log("error =", ev);
  });
});
