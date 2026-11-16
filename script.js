const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let scores = { X: 0, O: 0 };

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== '' || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    scores[currentPlayer]++;
    updateScore();
    isGameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusText.textContent = `It's a Draw 😐`;
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
  });
}

function updateScore() {
  scoreX.textContent = scores['X'];
  scoreO.textContent = scores['O'];
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player X's Turn`;
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));

