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
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _feeling_systems_txt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feeling-systems.txt */ \"./src/feeling-systems.txt\");\n\nconsole.log(_feeling_systems_txt__WEBPACK_IMPORTED_MODULE_0__);\n/**\n * expand\n * Return a list of strings from a text blob.\n */\n\nfunction expand(text) {\n  let textarea = document.getElementById(\"message\");\n  let ncols = textarea.cols;\n  let res = [];\n  text.split(\"\\n\").forEach(line => {\n    while (line.length > ncols) {\n      res.push(line.slice(0, ncols));\n      line = line.slice(ncols);\n    }\n\n    res.push(line);\n  });\n  return res.slice(0, 6);\n}\n/**\n * write\n * Replace svg text with multiple lines from an array of strings.\n */\n\n\nfunction write(lines) {\n  let textMeSoHard = document.getElementById(\"text-me-so-hard\");\n  textMeSoHard.innerHTML = \"\";\n  lines.forEach((line, i) => {\n    let x = 0;\n    let y = (i + 1) * 100;\n    let el = document.createElementNS('http://www.w3.org/2000/svg', 'text');\n    el.setAttribute(\"x\", \"0\");\n    el.setAttribute(\"y\", y.toString());\n    el.setAttribute(\"xml:space\", \"preserve\");\n    el.textContent = line;\n    textMeSoHard.appendChild(el);\n  });\n}\n\nlet lastTouch = {};\n\nfunction updateScale(t) {\n  let dis = document.getElementById(\"displacey\");\n\n  if (t === undefined || t < 0) {\n    return;\n  }\n\n  if (dis === undefined) {\n    return;\n  }\n\n  let speed = 26.0 / 60.0 / 60.0 / 24.0;\n  let now = +new Date() / 1000.0;\n  let scale = (now - t) * speed + 2.0;\n  dis.scale.baseVal = Math.min(scale, 80.0);\n}\n\n(function loopUpdateScale() {\n  requestAnimationFrame(loopUpdateScale);\n  updateScale(lastTouch.when);\n})();\n\nlet self = undefined;\nlet textMeOSoHard = undefined; // update\n//\n// Update DOM\n\nfunction update() {\n  write(expand(lastTouch.message));\n  let messageBox = document.getElementById(\"message-box\");\n  messageBox.className = lastTouch.last === self ? \"hidden\" : \"\";\n  let closer = document.getElementById(\"closer\");\n  closer.className = lastTouch.last === self ? \"hidden\" : \"\";\n  document.body.className = lastTouch.last === self ? \"unrequited\" : \"requited\";\n}\n\nwindow.addEventListener(\"load\", () => {\n  textMeOSoHard = document.getElementById(\"text-me-so-hard\");\n  let form = document.getElementById(\"write-a-message\"); // Attach submit event listener\n\n  form.addEventListener(\"submit\", ev => {\n    ev.preventDefault();\n    let el = document.getElementById(\"message\");\n    let payload = {\n      message: el.value || \"\",\n      nonce: \"nvm\"\n    }; // Touch\n\n    fetch(\"/touch\", {\n      method: \"POST\",\n      headers: {\n        'Accept': 'application/json',\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(payload)\n    }).then(text => {\n      return text.json();\n    }).then(resp => {// XXX: ???\n    });\n    document.activeElement.blur();\n    window.scrollTo(0, 0);\n    return false;\n  }); // Who am I?\n\n  fetch(\"/whoami\").then(function (res) {\n    return res.text();\n  }).then(function (text) {\n    self = JSON.parse(text).last;\n    update();\n  });\n  let url = location.origin.replace(\"http\", \"ws\") + \"/holding\";\n  let ws = new WebSocket(url);\n  ws.addEventListener(\"open\", ev => {// console.log(\"open =\", ev);\n  });\n  ws.addEventListener(\"close\", ev => {// console.log(\"close =\", ev);\n  });\n  ws.addEventListener(\"message\", ev => {\n    lastTouch = JSON.parse(ev.data); // console.log(\"lastTouch =\", lastTouch);\n    // console.log(lastTouch);\n\n    update();\n  });\n  ws.addEventListener(\"error\", ev => {// console.log(\"error =\", ev);\n  });\n});\n\n//# sourceURL=webpack://plz/./src/index.js?");

/***/ }),

/***/ "./src/feeling-systems.txt":
/*!*********************************!*\
  !*** ./src/feeling-systems.txt ***!
  \*********************************/
/***/ ((module) => {

eval("module.exports = \"  ______                     __  __                                       \\n /      \\\\                   /  |/  |                                      \\n/$$$$$$  |______    ______  $$ |$$/  _______    ______                    \\n$$ |_ $$//      \\\\  /      \\\\ $$ |/  |/       \\\\  /      \\\\                   \\n$$   |  /$$$$$$  |/$$$$$$  |$$ |$$ |$$$$$$$  |/$$$$$$  |                  \\n$$$$/   $$    $$ |$$    $$ |$$ |$$ |$$ |  $$ |$$ |  $$ |                  \\n$$ |    $$$$$$$$/ $$$$$$$$/ $$ |$$ |$$ |  $$ |$$ \\\\__$$ |                  \\n$$ |    $$       |$$       |$$ |$$ |$$ |  $$ |$$    $$ |                  \\n$$/      $$$$$$$/  $$$$$$$/ $$/ $$/ $$/   $$/  $$$$$$$ |                  \\n                                              /  \\\\__$$ |                  \\n                                              $$    $$/                   \\n                                               $$$$$$/                    \\n                                 __                                       \\n                                /  |                                      \\n  _______  __    __   _______  _$$ |_     ______   _____  ____    _______ \\n /       |/  |  /  | /       |/ $$   |   /      \\\\ /     \\\\/    \\\\  /       |\\n/$$$$$$$/ $$ |  $$ |/$$$$$$$/ $$$$$$/   /$$$$$$  |$$$$$$ $$$$  |/$$$$$$$/ \\n$$      \\\\ $$ |  $$ |$$      \\\\   $$ | __ $$    $$ |$$ | $$ | $$ |$$      \\\\ \\n $$$$$$  |$$ \\\\__$$ | $$$$$$  |  $$ |/  |$$$$$$$$/ $$ | $$ | $$ | $$$$$$  |\\n/     $$/ $$    $$ |/     $$/   $$  $$/ $$       |$$ | $$ | $$ |/     $$/ \\n$$$$$$$/   $$$$$$$ |$$$$$$$/     $$$$/   $$$$$$$/ $$/  $$/  $$/ $$$$$$$/  \\n          /  \\\\__$$ |                                                      \\n          $$    $$/                                                       \\n           $$$$$$/                                                        \\n\";\n\n//# sourceURL=webpack://plz/./src/feeling-systems.txt?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	plz = __webpack_exports__;
/******/ 	
/******/ })()
;