console.log("" +
`  ______                     __  __
 /      \\                   /  |/  |
/$$$$$$  |______    ______  $$ |$$/  _______    ______
$$ |_ $$//      \\  /      \\ $$ |/  |/       \\  /      \\
$$   |  /$$$$$$  |/$$$$$$  |$$ |$$ |$$$$$$$  |/$$$$$$  |
$$$$/   $$    $$ |$$    $$ |$$ |$$ |$$ |  $$ |$$ |  $$ |
$$ |    $$$$$$$$/ $$$$$$$$/ $$ |$$ |$$ |  $$ |$$ \\__$$ |
$$ |    $$       |$$       |$$ |$$ |$$ |  $$ |$$    $$ |
$$/      $$$$$$$/  $$$$$$$/ $$/ $$/ $$/   $$/  $$$$$$$ |
                                              /  \\__$$ |
                                              $$    $$/
                                               $$$$$$/
                                 __
                                /  |
  _______  __    __   _______  _$$ |_     ______   _____  ____    _______
 /       |/  |  /  | /       |/ $$   |   /      \\ /     \\/    \\  /       |
/$$$$$$$/ $$ |  $$ |/$$$$$$$/ $$$$$$/   /$$$$$$  |$$$$$$ $$$$  |/$$$$$$$/
$$      \\ $$ |  $$ |$$      \\   $$ | __ $$    $$ |$$ | $$ | $$ |$$      \\
 $$$$$$  |$$ \\__$$ | $$$$$$  |  $$ |/  |$$$$$$$$/ $$ | $$ | $$ | $$$$$$  |
/     $$/ $$    $$ |/     $$/   $$  $$/ $$       |$$ | $$ | $$ |/     $$/
$$$$$$$/   $$$$$$$ |$$$$$$$/     $$$$/   $$$$$$$/ $$/  $$/  $$/ $$$$$$$/
          /  \\__$$ |
          $$    $$/
           $$$$$$/`);

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
    el.setAttribute("class", "wavy");
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

  let now = +new Date()/1000.0;
  let scale = (now - t)/60.0/24.0 + 2.0;
  dis.scale.baseVal = Math.min(scale, 50.0);
}

(function loopUpdateScale() {
  requestAnimationFrame(loopUpdateScale);
  updateScale(lastTouch.when);
}());

/**
 * refreshLoop
 * Loop
 */
function refreshLoop() {
  fetch("/last")
    .then(function (res) {
      return res.text()
    })
    .then(function (text) {
      lastTouch = JSON.parse(text);
      write(expand(lastTouch.message));
      setTimeout(refreshLoop, 1000);
      let messageBox = document.getElementById("message-box");
      messageBox.className = lastTouch.last === self ? "hidden" : "";
    });
}


let self = undefined;


let textMeOSoHard = undefined;


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
      refreshLoop();
    });
});
