//your JS code here. If required.
const winningCombos = [
  [1,2,3], [4,5,6], [7,8,9],
  [1,4,7], [2,5,8], [3,6,9],
  [1,5,9], [3,5,7]
];

function checkWinner() {
  winningCombos.forEach(combo => {
    let [a, b, c] = combo;
    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      showWinner(currentPlayerName);
      highlightCells([a,b,c]);
    }
  });
}