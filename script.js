const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole')
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');
const highscoreBoard = document.querySelector('.highScore');


let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;
let highScore =  localStorage.getItem('game1HighScore') || 0;
highscoreBoard.textContent = 'HIGH SCORE: ' + highScore;



function pickRandomHole(holes) {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];
  if (hole === lastHole) {
    return pickRandomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function popOut() {
  const time = Math.random() * 1300 + 400;
  const hole = pickRandomHole(holes);
  hole.classList.add('up');
  setTimeout(function() {
    hole.classList.remove('up');
    if (!timeUp) popOut();
  }, time);
}
// popOut();

function startGame() {
  countdown = timeLimit/1000;
  scoreBoard.textContent = 0;
  // score to be invisible before starting game
  scoreBoard.style.display = 'block';
  countdownBoard.textContent = 'COUNTDOWN: ' + countdown;
  // incase we played before and it was set to true in previous game
  timeUp = false;
  // a reset
  score = 0;
  // causing moles to pop out of holes
  popOut();
  setTimeout(function() {
    timeUp = true;
  }, timeLimit);

  // run callback over and over
  let startCountdown = setInterval(function() {
    // we are counting down from 20 and displaying that as well
    countdown -= 1;
    countdownBoard.textContent = 'COUNTDOWN: ' + countdown;
    if (countdown < 0) {
      countdown = 0;
      clearInterval(startCountdown);
      checkHighScore();
      countdownBoard.textContent = "GAME OVER"
    }
  }, 1000)
}

startButton.addEventListener('click', startGame);

function whack(e) {
  score++;
  this.style.backgroundImage = "url('/docs/yoda2.png')";
  this.style.pointerEvents = 'none';
  setTimeout(() => {
    this.style.backgroundImage = "url('/docs/yoda1.png')";
    this.style.pointerEvents = 'all';
  }, 800);
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));

function checkHighScore() {
  if (score > localStorage.getItem('game1HighScore')) {
    localStorage.setItem('game1HighScore', score);
    highScore = score;
    highscoreBoard.textContent = 'HIGH SCORE: ' + highScore;
  }
}