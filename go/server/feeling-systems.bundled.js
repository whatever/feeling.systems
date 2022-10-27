/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var plz;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("console.log(`\n  ______                     __  __\n /      \\\\                   /  |/  |\n/$$$$$$  |______    ______  $$ |$$/  _______    ______\n$$ |_ $$//      \\\\  /      \\\\ $$ |/  |/       \\\\  /      \\\\\n$$   |  /$$$$$$  |/$$$$$$  |$$ |$$ |$$$$$$$  |/$$$$$$  |\n$$$$/   $$    $$ |$$    $$ |$$ |$$ |$$ |  $$ |$$ |  $$ |\n$$ |    $$$$$$$$/ $$$$$$$$/ $$ |$$ |$$ |  $$ |$$ \\\\__$$ |\n$$ |    $$       |$$       |$$ |$$ |$$ |  $$ |$$    $$ |\n$$/      $$$$$$$/  $$$$$$$/ $$/ $$/ $$/   $$/  $$$$$$$ |\n                                              /  \\\\__$$ |\n                                              $$    $$/\n                                               $$$$$$/\n                                 __\n                                /  |\n  _______  __    __   _______  _$$ |_     ______   _____  ____    _______\n /       |/  |  /  | /       |/ $$   |   /      \\\\ /     \\\\/    \\\\  /       |\n/$$$$$$$/ $$ |  $$ |/$$$$$$$/ $$$$$$/   /$$$$$$  |$$$$$$ $$$$  |/$$$$$$$/\n$$      \\\\ $$ |  $$ |$$      \\\\   $$ | __ $$    $$ |$$ | $$ | $$ |$$      \\\\\n $$$$$$  |$$ \\\\__$$ | $$$$$$  |  $$ |/  |$$$$$$$$/ $$ | $$ | $$ | $$$$$$  |\n/     $$/ $$    $$ |/     $$/   $$  $$/ $$       |$$ | $$ | $$ |/     $$/\n$$$$$$$/   $$$$$$$ |$$$$$$$/     $$$$/   $$$$$$$/ $$/  $$/  $$/ $$$$$$$/\n          /  \\\\__$$ |\n          $$    $$/\n           $$$$$$/\n`);\n\nfunction expand(text) {\n  let textarea = document.getElementById(\"message\");\n  let ncols = textarea.cols;\n  let res = [];\n  text.split(\"\\n\").forEach(line => {\n    while (line.length > ncols) {\n      res.push(line.slice(0, ncols));\n      line = line.slice(ncols);\n    }\n\n    res.push(line);\n  });\n  return res;\n}\n/**\n * refreshLoop\n * Loop\n */\n\n\nfunction refreshLoop() {\n  fetch(\"/last\").then(function (res) {\n    return res.text();\n  }).then(function (text) {\n    last = JSON.parse(text);\n    let expanded = expand(last.message);\n    let textMeSoHard = document.getElementById(\"text-me-so-hard\");\n    textMeSoHard.innerHTML = \"\";\n    expanded.forEach((line, i) => {\n      let x = 0;\n      let y = (i + 1) * 100;\n      let el = document.createElementNS('http://www.w3.org/2000/svg', 'text');\n      el.setAttribute(\"x\", \"0\");\n      el.setAttribute(\"y\", y.toString());\n      el.setAttribute(\"class\", \"wavy\");\n      el.textContent = line;\n      textMeSoHard.appendChild(el);\n    }); // let el = document.getElementById(\"status\");\n    // el.innerHTML = last.message;\n\n    /*\n    if (last.last != self) {\n      document.body.className = \"requited\";\n      let el = document.getElementById(\"status\");\n      el.innerText = \"someone clicked here recently\";\n    } else {\n    }\n    */\n\n    setTimeout(refreshLoop, 1000);\n  });\n}\n\nlet self = undefined;\nlet textMeOSoHard = undefined;\n\nfunction write() {// console.log(textMeOSoHard);\n}\n\nwindow.addEventListener(\"load\", () => {\n  textMeOSoHard = document.getElementById(\"text-me-so-hard\");\n  let form = document.getElementById(\"write-a-message\"); // Attach submit event listener\n\n  form.addEventListener(\"submit\", ev => {\n    ev.preventDefault();\n    let el = document.getElementById(\"message\");\n    let payload = {\n      message: el.value || \"\",\n      nonce: \"nvm\"\n    };\n    fetch(\"/touch\", {\n      method: \"POST\",\n      headers: {\n        'Accept': 'application/json',\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(payload)\n    }).then(text => {\n      return text.json();\n    }).then(resp => {\n      write(\"...ok\");\n    });\n    return false;\n  }); // Who am I?\n\n  fetch(\"/whoami\").then(function (res) {\n    return res.text();\n  }).then(function (text) {\n    self = JSON.parse(text).last;\n    refreshLoop();\n  });\n});\n\n//# sourceURL=webpack://plz/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	plz = __webpack_exports__;
/******/ 	
/******/ })()
;