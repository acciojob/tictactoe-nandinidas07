let currentPlayer = "X";
let player1Name = "";
let player2Name = "";
let board = Array(9).fill("");
let gameOver = false;

document.getElementById("submit").addEventListener("click", () => {
  player1Name = document.getElementById("player1").value;
  player2Name = document.getElementById("player2").value;

  document.querySelector(".input-section").style.display = "none";
  document.querySelector(".game-section").style.display = "block";

  document.getElementById("message").innerText = ${player1Name}, you're up;

  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = ""; // clear previous

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i;
    cell.addEventListener("click", () => makeMove(i, cell));
    boardDiv.appendChild(cell);
  }
});

function makeMove(index, cell) {
  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  cell.innerText = currentPlayer;

  if (checkWin()) {
    gameOver = true;
    const winner = currentPlayer === "X" ? player1Name : player2Name;
    document.getElementById("message").innerText = ${winner}, congratulations you won!;
    highlightWinningCells();
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  const nextPlayer = currentPlayer === "X" ? player1Name : player2Name;
  document.getElementById("message").innerText = ${nextPlayer}, you're up;
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern;
    }
  }
  return null;
}

function highlightWinningCells() {
  const winningPattern = checkWin();
  if (!winningPattern) return;
  for (let index of winningPattern) {
    document.getElementById(index).classList.add("winner");
  }
}