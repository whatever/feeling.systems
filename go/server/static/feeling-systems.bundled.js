/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var x_x;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _whoami_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./whoami.js */ \"./src/whoami.js\");\n/* harmony import */ var _feeling_systems_txt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feeling-systems.txt */ \"./src/feeling-systems.txt\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\n\n\nconsole.log(_feeling_systems_txt__WEBPACK_IMPORTED_MODULE_1__);\nconst DEBUG = false;\nlet lastTouch = {};\n/**\n * Update Scale of Distortion Map\n *\n * ...\n */\n\nfunction updateScale(t) {\n  let dis = document.getElementById(\"displacey\");\n\n  if (!dis) {\n    return;\n  }\n\n  if (t === undefined || t < 0) {\n    return;\n  }\n\n  if (dis === undefined) {\n    return;\n  }\n\n  let speed = 26.0 / 60.0 / 60.0 / 24.0;\n  let now = +new Date() / 1000.0;\n  let scale = (now - t) * speed + 2.0;\n  dis.scale.baseVal = Math.min(scale, 80.0);\n}\n/**\n * Update  DOM\n *\n * ...\n */\n\n\nfunction update() {\n  (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.write)((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.expand)(lastTouch.message || \"\"));\n  const HIDE_CLASS = \"hidden\";\n  let messageBox = document.getElementById(\"message-box\");\n\n  if (!messageBox) {\n    return;\n  }\n\n  messageBox.className = !DEBUG && lastTouch.who === (0,_whoami_js__WEBPACK_IMPORTED_MODULE_0__.whoami)() ? HIDE_CLASS : \"\";\n  let messageBoxContainer = document.getElementById(\"message-box-container\");\n  messageBoxContainer.className = !DEBUG && lastTouch.who === (0,_whoami_js__WEBPACK_IMPORTED_MODULE_0__.whoami)() ? HIDE_CLASS : \"\";\n  let closer = document.getElementById(\"closer\");\n  closer.className = !DEBUG && lastTouch.who === (0,_whoami_js__WEBPACK_IMPORTED_MODULE_0__.whoami)() ? HIDE_CLASS : \"\";\n  document.body.className = lastTouch.who === (0,_whoami_js__WEBPACK_IMPORTED_MODULE_0__.whoami)() ? \"unrequited\" : \"requited\";\n  document.documentElement.className = lastTouch.who === (0,_whoami_js__WEBPACK_IMPORTED_MODULE_0__.whoami)() ? \"unrequited\" : \"requited\";\n}\n/**\n * Connect Websocket\n * \n * Connect, Register Listener, Attempt to reopen on failure\n */\n\n\nfunction ConnectWebsocket() {\n  let url = location.origin.replace(\"http\", \"ws\") + \"/holding\";\n  let ws = new WebSocket(url);\n  ws.addEventListener(\"open\", ev => {\n    console.log(\"[open] websocket as \" + (0,_whoami_js__WEBPACK_IMPORTED_MODULE_0__.whoami)());\n    ws.send((0,_whoami_js__WEBPACK_IMPORTED_MODULE_0__.whoami)());\n  });\n  ws.addEventListener(\"message\", ev => {\n    lastTouch = JSON.parse(ev.data);\n    console.log(\"[message] received from \" + lastTouch.who);\n    update();\n  });\n  ws.addEventListener(\"error\", err => {\n    console.log(\"[error] \" + err);\n  });\n  ws.addEventListener(\"close\", ev => {\n    if (ev.code !== 1000 && ev.code !== 1001) {\n      console.log(\"[close]\", ev);\n      setTimeout(ConnectWebsocket, 1000);\n    }\n  });\n}\n/**\n * Handle Submit\n *\n * ...\n */\n\n\nfunction handleSubmit(ev) {\n  ev.preventDefault();\n  let el = document.getElementById(\"message\");\n  let payload = {\n    who: (0,_whoami_js__WEBPACK_IMPORTED_MODULE_0__.whoami)(),\n    message: el.value || \"\",\n    nonce: \"nvm\"\n  }; // Touch\n\n  fetch(\"/touch\", {\n    method: \"POST\",\n    headers: {\n      \"Accept\": \"application/json\",\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify(payload)\n  }).then(text => {\n    return text.json();\n  }).then(resp => {\n    console.log(\"[submit] success\");\n  }).catch(err => {\n    console.log(\"[submit] fail\");\n    console.error(err);\n  });\n  document.activeElement.blur();\n  document.getElementById(\"message\").value = \"\";\n  window.scrollTo(0, 0);\n  return false;\n}\n\nwindow.addEventListener(\"load\", () => {\n  document.getElementById(\"write-a-message\").addEventListener(\"submit\", handleSubmit);\n  ConnectWebsocket();\n\n  (function loopUpdateScale() {\n    requestAnimationFrame(loopUpdateScale);\n    updateScale(lastTouch.when);\n  })();\n});\n\n//# sourceURL=webpack://x_x/./src/index.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"expand\": () => (/* binding */ expand),\n/* harmony export */   \"write\": () => (/* binding */ write)\n/* harmony export */ });\n/**\n * expand\n * Return a list of strings from a text blob.\n */\nfunction expand(text) {\n  let textarea = document.getElementById(\"message\");\n\n  if (!textarea) {\n    return;\n  }\n\n  let ncols = textarea.cols;\n  let res = [];\n  text.split(\"\\n\").forEach(line => {\n    while (line.length > ncols) {\n      res.push(line.slice(0, ncols));\n      line = line.slice(ncols);\n    }\n\n    res.push(line);\n  });\n  return res.slice(0, 6);\n}\n/**\n * write\n * Replace svg text with multiple lines from an array of strings.\n */\n\nfunction write(lines) {\n  let textMeSoHard = document.getElementById(\"text-me-so-hard\");\n\n  if (!textMeSoHard) {\n    return;\n  }\n\n  textMeSoHard.innerHTML = \"\";\n  lines.forEach((line, i) => {\n    let x = 0;\n    let y = (i + 1) * 100;\n    let el = document.createElementNS('http://www.w3.org/2000/svg', 'text');\n    el.setAttribute(\"x\", \"0\");\n    el.setAttribute(\"y\", y.toString());\n    el.setAttribute(\"xml:space\", \"preserve\");\n    el.textContent = line;\n    textMeSoHard.appendChild(el);\n  });\n}\n\n//# sourceURL=webpack://x_x/./src/utils.js?");

/***/ }),

/***/ "./src/whoami.js":
/*!***********************!*\
  !*** ./src/whoami.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"generateId\": () => (/* binding */ generateId),\n/* harmony export */   \"whoami\": () => (/* binding */ whoami)\n/* harmony export */ });\nconst USER_ID_KEY = \"feeling-systems-id\";\nfunction generateId() {\n  let id = \"\";\n\n  for (let i = 0; i < 16; i++) {\n    let c = Math.floor(26 * Math.random());\n    id += String.fromCharCode(97 + c);\n  }\n\n  return id;\n}\nfunction whoami() {\n  let record = localStorage.getItem(USER_ID_KEY) || generateId();\n  localStorage.setItem(USER_ID_KEY, record);\n  return record;\n}\n\n//# sourceURL=webpack://x_x/./src/whoami.js?");

/***/ }),

/***/ "./src/feeling-systems.txt":
/*!*********************************!*\
  !*** ./src/feeling-systems.txt ***!
  \*********************************/
/***/ ((module) => {

eval("module.exports = \"  ______                     __  __                                       \\n /      \\\\                   /  |/  |                                      \\n/$$$$$$  |______    ______  $$ |$$/  _______    ______                    \\n$$ |_ $$//      \\\\  /      \\\\ $$ |/  |/       \\\\  /      \\\\                   \\n$$   |  /$$$$$$  |/$$$$$$  |$$ |$$ |$$$$$$$  |/$$$$$$  |                  \\n$$$$/   $$    $$ |$$    $$ |$$ |$$ |$$ |  $$ |$$ |  $$ |                  \\n$$ |    $$$$$$$$/ $$$$$$$$/ $$ |$$ |$$ |  $$ |$$ \\\\__$$ |                  \\n$$ |    $$       |$$       |$$ |$$ |$$ |  $$ |$$    $$ |                  \\n$$/      $$$$$$$/  $$$$$$$/ $$/ $$/ $$/   $$/  $$$$$$$ |                  \\n                                              /  \\\\__$$ |                  \\n                                              $$    $$/                   \\n                                               $$$$$$/                    \\n                                 __                                       \\n                                /  |                                      \\n  _______  __    __   _______  _$$ |_     ______   _____  ____    _______ \\n /       |/  |  /  | /       |/ $$   |   /      \\\\ /     \\\\/    \\\\  /       |\\n/$$$$$$$/ $$ |  $$ |/$$$$$$$/ $$$$$$/   /$$$$$$  |$$$$$$ $$$$  |/$$$$$$$/ \\n$$      \\\\ $$ |  $$ |$$      \\\\   $$ | __ $$    $$ |$$ | $$ | $$ |$$      \\\\ \\n $$$$$$  |$$ \\\\__$$ | $$$$$$  |  $$ |/  |$$$$$$$$/ $$ | $$ | $$ | $$$$$$  |\\n/     $$/ $$    $$ |/     $$/   $$  $$/ $$       |$$ | $$ | $$ |/     $$/ \\n$$$$$$$/   $$$$$$$ |$$$$$$$/     $$$$/   $$$$$$$/ $$/  $$/  $$/ $$$$$$$/  \\n          /  \\\\__$$ |                                                      \\n          $$    $$/                                                       \\n           $$$$$$/                                                        \\n\";\n\n//# sourceURL=webpack://x_x/./src/feeling-systems.txt?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	x_x = __webpack_exports__;
/******/ 	
/******/ })()
;