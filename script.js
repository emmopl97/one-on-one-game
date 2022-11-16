'use strict';

let player0Dom = document.querySelector(`.player--0`);
let player1Dom = document.querySelector(`.player--1`);
let name0Dom = document.getElementById(`name--0`);
let name1Dom = document.getElementById(`name--1`);
let score0Dom = document.getElementById(`score--0`);
let score1Dom = document.getElementById(`score--1`);
let current0Dom = document.getElementById(`current--0`);
let current1Dom = document.getElementById(`current--1`);
let diceDom = document.querySelector(`.dice`);
let btnNew = document.querySelector(`.btn--new`);
let btnRoll = document.querySelector(`.btn--roll`);
let btnHold = document.querySelector(`.btn--hold`);
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalClose = document.querySelector('.modalClose');
///////////////////////////////////////////////
let score, activePlayer, playing, current;
function toggleModal() {
  modal.classList.toggle(`hidden`);
  overlay.classList.toggle(`hidden`);
}

let init = function () {
  toggleModal();
  modalClose.addEventListener(`click`, toggleModal.bind(this));
  current = 0;
  score = [0, 0];
  activePlayer = 0;
  playing = true;
  current0Dom.textContent = 0;
  current1Dom.textContent = 0;
  score0Dom.textContent = score[0];
  score1Dom.textContent = score[1];
  diceDom.classList.add(`hidden`);
  player0Dom.classList.add(`player--active`);
  player1Dom.classList.remove(`player--active`);
  player0Dom.classList.remove(`player--winner`);
  player1Dom.classList.remove(`player--winner`);
};
let switchPlayer = function () {
  current = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  player0Dom.classList.toggle(`player--active`);
  player1Dom.classList.toggle(`player--active`);
};
let winner = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add(`player--winner`);
  diceDom.classList.add(`hidden`);
  playing = false;
};

//Initialize
init();
// click the roll dice button to put a random dice
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;

    diceDom.src = `dice-${dice}.png`;
    if (dice !== 1) {
      current = current + dice;
      document.getElementById(`current--${activePlayer}`).textContent = current;
    } else {
      switchPlayer();
    }
  }
});

//hold and pass player
btnHold.addEventListener(`click`, function () {
  if (playing) {
    score[activePlayer] = score[activePlayer] + current;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    if (score[activePlayer] >= 30) {
      winner();
    }
    switchPlayer();
  }
});

// new game
btnNew.addEventListener(`click`, init);
