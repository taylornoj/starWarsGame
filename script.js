const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole')
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;

function pickRandomHole(holes) {
  
}