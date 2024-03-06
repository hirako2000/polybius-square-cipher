const ROWS = 6;
const COLS = 5;
let cipherSeries = ["22", "43", "44", "16", "42", "44", "26"];
const ciphera = ["22", "43", "44", "16", "42", "44", "26"];
const cipherb = ["24", "51", "11", "13", "13", "45", "26"];
const cipherc = ["31", "43", "23", "51", "16", "43", "33"];

const grid = [
  ["A", "B", "C", "D", "E"],
  ["F", "G", "H", "I", "K"],
  ["L", "M", "N", "O", "P"],
  ["Q", "R", "S", "T", "U"],
  ["V", "W", "X", "Y", "Z"],
  [" ", "?", "!", "J", "#"] // Extends the Polybus grid
  // adds J and special chars
];

const polybiusContainer = document.getElementById("polybius-container");
const clearSpan = document.getElementById("clear");
const startButton = document.getElementById("start");

const createGridCell = (row, col, gridText) => {
  const gridCell = document.createElement("div");
  gridCell.classList.add("grid-cell");

  const cellText = document.createElement("div");
  cellText.textContent = gridText;
  gridCell.appendChild(cellText);

  gridCell.id = `${col + 1}${row + 1}`;

  if (row === ROWS - 1) {
    gridCell.classList.add("darker");
  }

  if (row === 0) {
    const label = createLabel(col + 1, "x-label");
    gridCell.appendChild(label);
  }

  if (col === 0) {
    const label = createLabel(row + 1, "y-label");
    gridCell.appendChild(label);
  }

  return gridCell;
};

const createLabel = (text, labelClass) => {
  const label = document.createElement("div");
  label.classList.add(labelClass);
  label.textContent = text;
  return label;
};

const animateGrid = () => {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const gridText = grid[row][col];
      const gridCell = createGridCell(row, col, gridText);
      polybiusContainer.appendChild(gridCell);

      setTimeout(() => {
        gridCell.style.opacity = 1;
      }, (row * COLS + col) * 60);
    }
  }
};

const bounce = () => {
  const solution = document.createElement("div");
  solution.id = "solution";

  cipherSeries.forEach((pair, index) => {
    setTimeout(() => {
      const gridCell = document.getElementById(pair);
      if (gridCell) {
        gridCell.classList.add("bounce");

        const letter = document.createElement("span");
        letter.classList.add("letter");
        letter.textContent = gridCell.firstChild.textContent;

        solution.appendChild(letter);
        clearSpan.appendChild(solution);

        if (index === cipherSeries.length - 1) {
          started = false;
          startButton.classList.add("enabled");
        }

        setTimeout(() => {
          gridCell.classList.remove("bounce");
          letter.classList.add("reveal");
        }, 300);
      }
    }, index * 800 + 2000);
  });
};

const clearAnimations = () => {
  console.log("clear animations");
  timeouts.forEach((id, index) => {
    window.clearTimeout(id);
  });
};

const init = () => {
  animateGrid();
  bounce();
};

const resetCipher = () => {
  const cipher = document.getElementById("cipher");
  if (cipherSeries === cipherb) {
    cipherSeries = cipherc;
    cipher.textContent = cipherc;
  } else if (cipherSeries === cipherc) {
    cipherSeries = ciphera;
    const solution = document.getElementById("solution");
    solution.textContent = "";
    cipher.textContent = ciphera;
  } else {
    cipherSeries = cipherb;
    cipher.textContent = cipherb;
  }
};

const restart = () => {
  if (started) {
    return;
  }
  startButton.classList.remove("enabled");
  started = true;
  resetCipher();
  polybiusContainer.innerHTML = "";
  init();
};

init();
