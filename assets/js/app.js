function isValidString(s) {
  let balance = 0;
  for (let char of s) {
    if (char === "(") {
      balance++;
    } else if (char === ")") {
      balance--;
    }
    if (balance < 0) return false;
  }
  return balance === 0;
}

function removeInvalidParentheses() {
  const inputString = document.getElementById("inputString").value;
  const resultElement = document.getElementById("validStrings");
  resultElement.innerHTML = "";

  const queue = new Set([inputString]);
  const visited = new Set([inputString]);
  let found = false;

  while (queue.size > 0) {
    const nextQueue = new Set();

    for (let str of queue) {
      if (isValidString(str)) {
        resultElement.innerHTML += `<li>${str}</li>`;
        found = true;
      }

      if (found) continue;

      for (let i = 0; i < str.length; i++) {
        if (str[i] !== "(" && str[i] !== ")") continue;

        const newStr = str.slice(0, i) + str.slice(i + 1);
        if (!visited.has(newStr)) {
          nextQueue.add(newStr);
          visited.add(newStr);
        }
      }
    }

    if (found) break;
    queue.clear();
    queue.add(...nextQueue);
  }

  if (!found) {
    resultElement.innerHTML = "<li>No valid strings found</li>";
  }
}
