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

eval("console.log(\"\" + `  ______                     __  __\n /      \\\\                   /  |/  |\n/$$$$$$  |______    ______  $$ |$$/  _______    ______\n$$ |_ $$//      \\\\  /      \\\\ $$ |/  |/       \\\\  /      \\\\\n$$   |  /$$$$$$  |/$$$$$$  |$$ |$$ |$$$$$$$  |/$$$$$$  |\n$$$$/   $$    $$ |$$    $$ |$$ |$$ |$$ |  $$ |$$ |  $$ |\n$$ |    $$$$$$$$/ $$$$$$$$/ $$ |$$ |$$ |  $$ |$$ \\\\__$$ |\n$$ |    $$       |$$       |$$ |$$ |$$ |  $$ |$$    $$ |\n$$/      $$$$$$$/  $$$$$$$/ $$/ $$/ $$/   $$/  $$$$$$$ |\n                                              /  \\\\__$$ |\n                                              $$    $$/\n                                               $$$$$$/\n                                 __\n                                /  |\n  _______  __    __   _______  _$$ |_     ______   _____  ____    _______\n /       |/  |  /  | /       |/ $$   |   /      \\\\ /     \\\\/    \\\\  /       |\n/$$$$$$$/ $$ |  $$ |/$$$$$$$/ $$$$$$/   /$$$$$$  |$$$$$$ $$$$  |/$$$$$$$/\n$$      \\\\ $$ |  $$ |$$      \\\\   $$ | __ $$    $$ |$$ | $$ | $$ |$$      \\\\\n $$$$$$  |$$ \\\\__$$ | $$$$$$  |  $$ |/  |$$$$$$$$/ $$ | $$ | $$ | $$$$$$  |\n/     $$/ $$    $$ |/     $$/   $$  $$/ $$       |$$ | $$ | $$ |/     $$/\n$$$$$$$/   $$$$$$$ |$$$$$$$/     $$$$/   $$$$$$$/ $$/  $$/  $$/ $$$$$$$/\n          /  \\\\__$$ |\n          $$    $$/\n           $$$$$$/`);\n/**\n * expand\n * Return a list of strings from a text blob.\n */\n\nfunction expand(text) {\n  let textarea = document.getElementById(\"message\");\n  let ncols = textarea.cols;\n  let res = [];\n  text.split(\"\\n\").forEach(line => {\n    while (line.length > ncols) {\n      res.push(line.slice(0, ncols));\n      line = line.slice(ncols);\n    }\n\n    res.push(line);\n  });\n  return res;\n}\n/**\n * write\n * Replace svg text with multiple lines from an array of strings.\n */\n\n\nfunction write(lines) {\n  let textMeSoHard = document.getElementById(\"text-me-so-hard\");\n  textMeSoHard.innerHTML = \"\";\n  lines.forEach((line, i) => {\n    let x = 0;\n    let y = (i + 1) * 100;\n    let el = document.createElementNS('http://www.w3.org/2000/svg', 'text');\n    el.setAttribute(\"x\", \"0\");\n    el.setAttribute(\"y\", y.toString());\n    el.setAttribute(\"class\", \"wavy\");\n    el.textContent = line;\n    textMeSoHard.appendChild(el);\n  });\n}\n\nlet lastTouch = {};\n\nfunction updateScale(t) {\n  let dis = document.getElementById(\"displacey\");\n\n  if (t === undefined || t < 0) {\n    return;\n  }\n\n  if (dis === undefined) {\n    return;\n  }\n\n  let now = +new Date() / 1000.0;\n  let scale = 10.0 * (now - t);\n  dis.scale.baseVal = scale;\n}\n\n(function loopUpdateScale() {\n  requestAnimationFrame(loopUpdateScale);\n  updateScale(lastTouch.when);\n})();\n/**\n * refreshLoop\n * Loop\n */\n\n\nfunction refreshLoop() {\n  fetch(\"/last\").then(function (res) {\n    return res.text();\n  }).then(function (text) {\n    last = JSON.parse(text);\n    lastTouch = last;\n    write(expand(last.message));\n    setTimeout(refreshLoop, 1000);\n  });\n}\n\nlet self = undefined;\nlet textMeOSoHard = undefined;\nwindow.addEventListener(\"load\", () => {\n  textMeOSoHard = document.getElementById(\"text-me-so-hard\");\n  let form = document.getElementById(\"write-a-message\"); // Attach submit event listener\n\n  form.addEventListener(\"submit\", ev => {\n    ev.preventDefault();\n    let el = document.getElementById(\"message\");\n    let payload = {\n      message: el.value || \"\",\n      nonce: \"nvm\"\n    };\n    fetch(\"/touch\", {\n      method: \"POST\",\n      headers: {\n        'Accept': 'application/json',\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(payload)\n    }).then(text => {\n      return text.json();\n    }).then(resp => {});\n    return false;\n  }); // Who am I?\n\n  fetch(\"/whoami\").then(function (res) {\n    return res.text();\n  }).then(function (text) {\n    self = JSON.parse(text).last;\n    refreshLoop();\n  });\n});\n\n//# sourceURL=webpack://plz/./src/index.js?");

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