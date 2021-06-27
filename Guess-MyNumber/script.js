'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;    // 1부터 20까지 랜덤번호 
let score = 20;                                           // 총 20번 기회
let highScore = 0;                                        // 최고 기록 저장 변수

// 메시지를 화면에 출력
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// check 버튼 이벤트 함수
document.querySelector('.check').addEventListener('click', function () {

  const guess = Number(document.querySelector('.guess').value);   // 입력한 숫자
 
  // 입력값이 없을때
  if (!guess) {
  
    // 번호 없음 메시지 출력
    displayMessage('❌ No number!');

    //입력한 수와 랜덤 번호가 같을 경우
  } else if (guess === secretNumber) {
  
    displayMessage('🎉 Correct Number!');

    // 화면 디자인 변경
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    // 최고기록 점수를 갱신
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    //입력한 수와 랜덤 번호가 다를 경우
  } else if (guess !== secretNumber) {

    // 기회가 남아있을 경우
    if (score > 1) {
      // 숫자를 비교하여 높은지 낮은지 힌트 제공
      displayMessage(guess > secretNumber ? '⬆ Too high' : '⬇ Too low');
      score--;
      document.querySelector('.score').textContent = score;
   
      // 기회를 다 사용한 경우
    } else {
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

// Again 버튼 이벤트 함수 -> 처음 화면으로 다시 세팅
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
