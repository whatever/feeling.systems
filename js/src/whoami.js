const USER_ID_KEY = "feeling-systems-id";

export function generateId() {
  let id = "";
  for (let i=0; i < 16; i++) {
    let c = Math.floor(26*Math.random());
    id += String.fromCharCode(97+c);
  }
  return id;
}

export function whoami() {
  let record = localStorage.getItem(USER_ID_KEY) || generateId();
  localStorage.setItem(USER_ID_KEY, record);
  return record;
}
