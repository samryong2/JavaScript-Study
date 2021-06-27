'use strict';

import PopUp from "./popup.js";
import Field from "./field.js";

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const CARROT_SIZE = 80;         // 당근 이미지 사이즈
const GAME_DURATION_SEC = 5;

const section = document.querySelector('.game-section');// 게임 SECTION
const fieldRect = section.getBoundingClientRect();      // 게임 SECTION RECT
const playBtn = document.querySelector('.play-btn');    // 게임 시작 버튼

// 게임 상태
let gameStatus = false;
let score = 0;
let timer = undefined;


const carrotSound = new Audio('./sound/carrot_pull.mp3');       // 당근 클릭 사운드
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
    
const timeZone = document.querySelector('.time-zone');          // 타이머 dom
const carrotCount = document.querySelector('.carrot-count');    // 당근 숫자 dom
const icon = playBtn.querySelector('.fa-play');                 //  



const gameFinishBanner = new PopUp();
const gameField = new Field(CARROT_COUNT,BUG_COUNT);

gameField.setClickListener(onItemClick());

function onItemClick(item) {
    console.log("item : "+item);
    if (!gameStatus) {
        return;
    }
    if (item === 'carrot') {
        
        score++;
        updateScoreBoard();
        if (score === CARROT_COUNT) {
            finishGame(true);
            
        }
    }else if (item === 'bug') {
        console.log("여기");
        finishGame(false);
    }
}

gameFinishBanner.setClickListener(()=>{
    startGame();
})
// section.addEventListener('click',onFieldClick)

playBtn.addEventListener('click',(event)=>{
    if (gameStatus) {
        stopGame();
    }else{
        startGame();
    }
    // gameStatus = !gameStatus;
})




function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function finishGame(win) {
    gameStatus = false;
    if (win) {
        playSound(winSound);
    }else {
        playSound(bugSound);
    }
    hiddenGameButton();
    stopSound(bgSound);
    gameFinishBanner.showPopUpWithText(win? 'YOU WON' : 'YOU LOST');
    timerReset();
}

function updateScoreBoard() {
    carrotCount.innerHTML = CARROT_COUNT - score;
}

function startGame() {
    gameStatus = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    gameStatus = false;
    timerReset();
    hiddenTimerAndScore();
    hiddenGameButton();
    gameFinishBanner.showPopUpWithText('REPLAY?');
    // showPopUpWithText('REPLAY?');
    playSound(alertSound);
}

function timerReset() {
    timeZone.innerHTML = `0:${GAME_DURATION_SEC}`;
    clearInterval(timer);
}

function hiddenTimerAndScore() {
    timeZone.style.visibility = 'hidden';
    carrotCount.style.visibility = 'hidden';
}



function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC; // 타이머 시간 
    timer = setInterval(()=>{
        if (remainingTimeSec <= 0) {
            clearInterval(timer);

            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timeZone.innerHTML = `${minutes}:${seconds}`;
}

function hiddenGameButton() {
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
    carrotCount.innerHTML = CARROT_COUNT;
    score = 0;
    gameField.init();
}
