let currentPlayer = 'X';
let players = {};
let board = Array(9).fill(null);
let gameActive = false;

const messageEl = document.getElementById('message');
const boardEl = document.getElementById('board');
const inputSection = document.getElementById('input-section');
const gameSection = document.getElementById('game-section');

document.getElementById('submit').addEventListener('click', startGame);

function startGame() {
  const p1 = document.getElementById('player1').value.trim();
  const p2 = document.getElementById('player2').value.trim();

  if (!p1 || !p2) {
    alert('Please enter names for both players.');
    return;
  }

  players = {
    X: p1,
    O: p2
  };

  currentPlayer = 'X';
  board = Array(9).fill(null);
  gameActive = true;

  inputSection.classList.add('hidden');
  gameSection.classList.remove('hidden');
  updateMessage(${players[currentPlayer]}, you're up);
  drawBoard();
}

function drawBoard() {
  boardEl.innerHTML = '';

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', i); // for Cypress: cy.get('#0'), etc.
    cell.addEventListener('click', () => handleClick(i));
    boardEl.appendChild(cell);
  }
}

function handleClick(index) {
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  const cellEl = document.getElementById(index);
  cellEl.textContent = currentPlayer;

  if (checkWinner()) {
    gameActive = false;
    updateMessage(${players[currentPlayer]} congratulations you won!);
    highlightWinningCells();
  } else if (board.every(cell => cell !== null)) {
    gameActive = false;
    updateMessage("It's a draw!");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage(${players[currentPlayer]}, you're up);
  }
}

function updateMessage(msg) {
  messageEl.textContent = msg;
}

function checkWinner() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let pattern of wins) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }
  return false;
}

function highlightWinningCells() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let pattern of wins) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      document.getElementById(a).classList.add('winning');
      document.getElementById(b).classList.add('winning');
      document.getElementById(c).classList.add('winning');
      break;
    }
  }
}