'use strict';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const CARROT_SIZE = 80;         // 당근 이미지 사이즈

const section = document.querySelector('.game-section');// 게임 SECTION
const fieldRect = section.getBoundingClientRect();      // 게임 SECTION RECT
const playBtn = document.querySelector('.play-btn');    // 게임 시작 버튼

// 게임 상태
let gameStatus = false;
let score = 0;
let timer = undefined;

    
const timeZone = document.querySelector('.time-zone');          // 타이머 dom
const carrotCount = document.querySelector('.carrot-count');    // 당근 숫자 dom
const icon = playBtn.querySelector('.fa-play');                 //  


playBtn.addEventListener('click',(event)=>{
    if (gameStatus) {
        stopGame();
    }else{
        startGame();
    }

    gameStatus = !gameStatus;
})

function startGame() {
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function stopGame() {
    timerReset();
    hiddenTimerAndScore();
    hiddenStopButton();
}

function timerReset() {
    timeZone.innerHTML = "1:00";
    clearInterval(timer);
}

function hiddenTimerAndScore() {
    timeZone.style.visibility = 'hidden';
    carrotCount.style.visibility = 'hidden';
}

function startGameTimer() {
    let setTime = 60; // 타이머 시간 
    timer = setInterval(()=>{
        timeZone.innerHTML = --setTime;
    }, 1000);
}

function hiddenStopButton() {
    icon.classList.remove('fa-stop');
    icon.classList.add('fa-play');
}

function showStopButton() {
    
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showTimerAndScore() {
    timeZone.style.visibility = 'visible';
    carrotCount.style.visibility = 'visible';
}

// 게임 초기화 
function initGame() {
    section.innerHTML = "";
    carrotCount.innerHTML = CARROT_COUNT;
    // 벌레와 당근을 생성한뒤 field에 추가해줌
    addItem('carrot',5,'./img/carrot.png');
    addItem('bug',5,'./img/bug.png');
}
// 당근과 벌레 생성 함수
function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1,x2);
        const y = randomNumber(y1,y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        section.appendChild(item);
    }
}
// 게임 SECTION에서의 RANDOM 좌표 구하는 함수
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}



// const test = document.querySelector('#background');
// test.addEventListener('click',(event)=>{
//     console.log(`target : ${event.target}` );
// })


// initGame();