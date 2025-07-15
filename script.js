let currentPlayer = 'X';
let players = {};
let gameActive = false;
let board = Array(9).fill(null);
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

document.getElementById('start-btn').addEventListener('click', startGame);

function startGame() {
  const p1 = document.getElementById('player-1').value.trim();
  const p2 = document.getElementById('player-2').value.trim();
  if (!p1 || !p2) {
    alert('Enter both player names!');
    return;
  }

  players = { X: p1, O: p2 };
  gameActive = true;
  currentPlayer = 'X';
  board.fill(null);

  document.getElementById('input-section').classList.add('hidden');
  document.getElementById('game-section').classList.remove('hidden');
  updateMessage(${players[currentPlayer]}, you're up);
  createBoard();
}

function createBoard() {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    boardEl.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    gameActive = false;
    updateMessage(${players[winner]}, congratulations you won!);
    highlightWinningCells(winner);
  } else if (board.every(cell => cell)) {
    updateMessage('It\'s a draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage(${players[currentPlayer]}, you're up);
  }
}

function updateMessage(msg) {
  document.getElementById('message').textContent = msg;
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function highlightWinningCells(winner) {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] === winner && board[b] === winner && board[c] === winner) {
      const cells = document.querySelectorAll('.cell');
      cells[a].classList.add('winning');
      cells[b].classList.add('winning');
      cells[c].classList.add('winning');
      break;
    }
  }
}