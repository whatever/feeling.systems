/**
 * expand
 * Return a list of strings from a text blob.
 */
export function expand(text) {
  let textarea = document.getElementById("message");

  if (!textarea) {
    return;
  }

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
export function write(lines) {
  let textMeSoHard = document.getElementById("text-me-so-hard");

  if (!textMeSoHard) {
    return;
  }

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
