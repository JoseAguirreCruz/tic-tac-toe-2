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
