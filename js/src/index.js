console.log(`
  ______                     __  __
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
           $$$$$$/
`);

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
 * refreshLoop
 * Loop
 */
function refreshLoop() {
  fetch("/last")
    .then(function (res) {
      return res.text()
    })
    .then(function (text) {
      last = JSON.parse(text);

      let expanded = expand(last.message);

      let textMeSoHard = document.getElementById("text-me-so-hard");
      textMeSoHard.innerHTML = "";

      expanded.forEach((line, i) => {
        let x = 0;
        let y = (i+1)*100;
        let el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        el.setAttribute("x", "0");
        el.setAttribute("y", y.toString());
        el.setAttribute("class", "wavy");
        el.textContent = line;
        textMeSoHard.appendChild(el);
      });

      // let el = document.getElementById("status");
      // el.innerHTML = last.message;

      /*
      if (last.last != self) {
        document.body.className = "requited";
        let el = document.getElementById("status");
        el.innerText = "someone clicked here recently";
      } else {
      }
      */
      setTimeout(refreshLoop, 1000);
    });
}


let self = undefined;
let textMeOSoHard = undefined;


function write() {
  // console.log(textMeOSoHard);
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
      write("...ok");
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
