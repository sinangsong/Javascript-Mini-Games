'use strict';

// Elements 선택
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// 변수들
let scores, currentScore, activePlayer, playing;

// 초기화 init 함수
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// 플레이어 전환
const swichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// 주사위 던지는 이벤트
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. 1~6 사이의 랜덤 숫자 생성
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. 화면에 주사위 출력
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. 주사위 숫자가 1이 아니면
    if (dice !== 1) {
      // 현재 점수에 숫자 더하기
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // 주사위 숫자기 1이면
    } else {
      // 플레이어 전환
      swichPlayer();
    }
  }
});

// Hold 버튼 이벤트
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. 플레이어에 현재 점수에 더하기
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. 플레이어의 점수가 100이상일때
    if (scores[activePlayer] >= 100) {
      // 게임 종료
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 플레이어 전환
      swichPlayer();
    }
  }
});

// New Game 버튼 이벤트 -> 초기화 함수 call
btnNew.addEventListener('click', init);
