const boxes = document.querySelectorAll('.box');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const startBtn = document.getElementById('startBtn');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');

let currentPlayer = 'X';
let gameActive = false;
let board = Array(9).fill('');
let playerNames = { X: 'Player X', O: 'Player O' };

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];
function startGame() {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();
  if (!p1 || !p2) {
    alert("Enter both player names");
    return;
  }
  playerNames.X = p1;
  playerNames.O = p2;
  gameActive = true;
  startBtn.classList.add('hidden');
  resetBtn.classList.remove('hidden');
  updateStatus();
}

function updateStatus() {
  statusDiv.textContent = `${playerNames[currentPlayer]}'s Turn (${currentPlayer})`;
}

function handleBoxClick(e) {
  const index = [...boxes].indexOf(e.target);
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  clickSound.play();

  if (checkWinner()) {
    statusDiv.textContent = `${playerNames[currentPlayer]} Wins`;
    gameActive = false;
    winSound.play();
    return;
  }

  if (board.every(cell => cell !== '')) {
    statusDiv.textContent = `It's a Draw`;
    drawSound.play();
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function checkWinner() {
  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] === currentPlayer &&
           board[a] === board[b] &&
           board[a] === board[c];
  });
}

function resetGame() {
  board.fill('');
  boxes.forEach(box => box.textContent = '');
  gameActive = true;
  currentPlayer = 'X';
  updateStatus();
}
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
boxes.forEach(box => box.addEventListener('click', handleBoxClick));

