const board = document.getElementById('board');
const resetButton = document.getElementById('restartButton');
const playButton = document.getElementById('playButton');
const message = document.getElementById('winText');
const modal = document.getElementById('modal');
const winMessage = document.getElementById('winningMessage');
const muteButton = document.getElementById('muteButton');
const squares = Array.from(document.getElementsByClassName('square'));

const players = {
  null: '#eee',
  1: 'X',
  '-1': 'O'
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let boardState;
let turn;
let winner;
let isMuted = false;

function init() {
  const bgMusic = document.getElementById('bgMusic');
  bgMusic.play();
  boardState = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;
  render();
}

function render() {
  boardState.forEach((square, index) => {
    squares[index].textContent = square === 1 ? 'X' : square === -1 ? 'O' : '';
  });
  if (winner) {
    if (winner === 'T') {
      message.innerText = 'It\'s a tie!';
    } else {
      message.innerText = `Player ${players[winner].toUpperCase()} wins!`;
    }
    winMessage.classList.remove('hide');
  } else {
    winMessage.classList.add('hide');
  }
  message.classList.remove('x', 'circle');
  message.classList.add(turn === 1 ? 'x' : 'circle');
}

function handleClick(e) {
  const index = squares.indexOf(e.target);
  if (boardState[index] || winner) return;
  boardState[index] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function getWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }

  if (boardState.every(square => square !== null)) {
    return 'T';
  }
  return null;
}

function handleReset() {
  init();
}

function handlePlay() {
  modal.classList.add('hide');
  init();
}

function handleMute() {
  const bgMusic = document.getElementById('bgMusic');
  if (isMuted) {
    bgMusic.play();
    isMuted = false;
    muteButton.innerText = 'Mute';
  } else {
    bgMusic.pause();
    isMuted = true;
    muteButton.innerText = 'Unmute';
  }
}

squares.forEach(square => square.addEventListener('click', handleClick));
resetButton.addEventListener('click', handleReset);
playButton.addEventListener('click', handlePlay);
muteButton.addEventListener('click', handleMute);
