const USER_ID_KEY = "feeling-systems-id";

let WHO_AM_I = undefined;

export function generateId() {
  let id = "";
  for (let i=0; i < 16; i++) {
    let c = Math.floor(26*Math.random());
    id += String.fromCharCode(97+c);
  }
  return id;
}

export function whoami() {

  if (WHO_AM_I !== undefined) {
    return WHO_AM_I;
  }

  const tetherMatches = window.location.pathname.match(/^\/tether\/([a-zA-Z0-9]{16}$)/);

  if (tetherMatches && tetherMatches.length == 2) {
    console.log("[local] change user id to", tetherMatches[1]);
    localStorage.setItem(USER_ID_KEY, tetherMatches[1]);
    history.pushState({}, "", "/");
  }

  WHO_AM_I = localStorage.getItem(USER_ID_KEY) || generateId();
  localStorage.setItem(USER_ID_KEY, WHO_AM_I);

  return WHO_AM_I;
}
