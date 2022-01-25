'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const btnMaxUp = document.querySelector('.btn--points-up');
const btnMaxDown = document.querySelector('.btn--points-down');
const pointsScore = document.querySelector('.points-score');
const diceIm = document.querySelector('.dice');

let dice, current, activePlayer;
let max = 30;
let soma = 0;
let soma0 = 0;
let soma1 = 0;
let player = 0;
let score = 0;

function initReceiveCurrent() {
  diceIm.classList.remove('hidden');
  dice = Math.trunc(Math.random() * 6) + 1;
  diceIm.src = `dice-${dice}.png`;

  soma = player === 0 ? (soma0 += dice) : (soma1 += dice);
  current = document.querySelector(`#current--${player}`);
  score = document.querySelector(`#score--${player}`);
  activePlayer = document.querySelector(`.player--${player}`);

  if (dice === 1) {
    current.textContent = 0;
    score.textContent = 0;
    soma = player === 0 ? (soma0 = 0) : (soma1 = 0);
    switchPlayer();
  } else {
    current.textContent = soma;
  }
}

function receiveScoreCheckWinner() {
  score.textContent = soma;

  if (score.textContent >= max) {
    activePlayer.classList.add('player--winner');
  } else switchPlayer();
}

function switchPlayer() {
  player = player === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

function newGame() {
  if (!player0.classList.contains('player--active')) {
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
  }
  diceIm.classList.add('hidden');
  if (player0.classList.contains('player--winner')) {
    player0.classList.remove('player--winner');
  }
  if (player1.classList.contains('player--winner')) {
    player1.classList.remove('player--winner');
  }
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  player = 0;
  soma = 0;
  soma0 = 0;
  soma1 = 0;
}

function receiveMaxUp() {
  max = 40;
  pointsScore.textContent = max;
}

function receiveMaxDown() {
  max = 20;
  pointsScore.textContent = max;
}

diceIm.classList.add('hidden');
roll.addEventListener('click', initReceiveCurrent);
hold.addEventListener('click', receiveScoreCheckWinner);
btnNew.addEventListener('click', newGame);
btnMaxUp.addEventListener('click', receiveMaxUp);
btnMaxDown.addEventListener('click', receiveMaxDown);
