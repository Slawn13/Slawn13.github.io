const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let playedCells = ["", "", "", "", "", "", "", "", ""];

let player = "";

let countClick = 0;
let turn;

const myBoard = document.querySelector(".board");
let message = document.querySelector(".message");
message.innerText = "Play X";

function playing(e) {
  const i = e.target.getAttribute("id");
  let caseJouey = document.getElementById(i);

  countClick = countClick + 1;
  turn = countClick % 2;

  if (turn == 1) {
    player = "X";
    message.innerText = "Play O";
  } else if (turn == 0) {
    player = "O";
    message.innerText = "Play X";
  }

  playedCells[i] = player;
  caseJouey.innerText = player;

  caseJouey.removeEventListener("click", playing);

  winCombinations.forEach((winComb) => {
    if (
      playedCells[winComb[0]] == "X" &&
      playedCells[winComb[1]] == "X" &&
      playedCells[winComb[2]] == "X"
    ) {
      message.innerText = "Player X wins";
      stopGame();
    } else if (
      playedCells[winComb[0]] == "O" &&
      playedCells[winComb[1]] == "O" &&
      playedCells[winComb[2]] == "O"
    ) {
      message.innerText = "Player O wins";
      stopGame();
    }
  });

  let allCells = document.querySelectorAll(".cell");
  let b1 = allCells[0].innerText;
  let b2 = allCells[1].innerText;
  let b3 = allCells[2].innerText;
  let b4 = allCells[3].innerText;
  let b5 = allCells[4].innerText;
  let b6 = allCells[5].innerText;
  let b7 = allCells[6].innerText;
  let b8 = allCells[7].innerText;
  let b9 = allCells[8].innerText;

  if (
    b1 != "" &&
    b2 != "" &&
    b3 != "" &&
    b4 != "" &&
    b5 != "" &&
    b6 != "" &&
    b7 != "" &&
    b8 != "" &&
    b9 != ""
  ) {
    message.innerText = "Match Tie";
    stopGame();
  }
}

function TapeTesCasesFieu() {
  for (let i = 0; i < 9; i++) {
    let newItem = document.createElement("div");
    newItem.setAttribute("class", "cell");
    newItem.setAttribute("id", `${i}`);
    myBoard.appendChild(newItem);
  }
}

TapeTesCasesFieu();

function addEvent() {
  let allCells = document.querySelectorAll(".cell");

  for (i = 0; i < 9; i++) {
    allCells[i].addEventListener("click", playing);
  }
}

addEvent();

function stopGame() {
  let allCells = document.querySelectorAll(".cell");
  allCells.forEach((cell) => cell.removeEventListener("click", playing));
}

// RESTART

let restart = document.querySelector(".restart");

restart.addEventListener("click", (e) => {
  playedCells = ["", "", "", "", "", "", "", "", ""];
  let allCells = document.querySelectorAll(".cell");
  allCells.forEach((cell) => (cell.innerText = ""));
  countClick = 0;
  message.innerText = "Play X";
  addEvent();
});
