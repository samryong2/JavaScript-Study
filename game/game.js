import Field from "./field.js";
import * as sound from "./sound.js";


export default class GameBuilder {
    gameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    carrotCount(num){
        this.carrotCount = num;
        return this;
    }

    bugCount(num){
        this.bugCount = num;
        return this;
    }

    build(){
        return new Game (
            this.gameDuration,
            this.carrotCount,
            this.bugCount
            )
    }
}

class Game {

    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.section = document.querySelector('.game-section');// 게임 SECTION
        this.fieldRect = this.section.getBoundingClientRect();      // 게임 SECTION RECT
        this.playBtn = document.querySelector('.play-btn');    // 게임 시작 버튼
        this.playBtn.addEventListener('click',(event)=>{
            if (this.gameStatus) {
                this.stop();
            }else{
                this.start();
            }
        })

        this.gameStatus = false;
        this.score = 0;
        this.timer = undefined;

        this.gameField = new Field(this.carrotCount,this.bugCount);
        this.gameField.setClickListener(this.onItemClick);

        this.timeZone = document.querySelector('.time-zone');          // 타이머 dom
        this.gameScore = document.querySelector('.carrot-count');    // 당근 숫자 dom
        this.icon = this.playBtn.querySelector('.fa-play'); 
    }

    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    }


    onItemClick = (item) => {
        if (!this.gameStatus) {
            return;
        }
        if (item === 'carrot') {
            this.score++;
            this.updateScoreBoard();
            if (this.score === this.carrotCount) {
                this.finishGame(true);
            }
        }else if (item === 'bug') {
            this.finish(false);
        }
    }

    start() {
        this.gameStatus = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBg();
    }
    
    stop() {
        this.gameStatus = false;
        this.timerReset();
        this.hiddenTimerAndScore();
        this.hiddenGameButton();
        sound.stopBg();
        sound.playAlert();
        this.onGameStop && this.onGameStop('cancel');
    }

    finish(win) {
        this.gameStatus = false;
        if (win) {
            sound.playWin();
        }else {
            sound.playBg();
        }
        this.hiddenGameButton();
        sound.stopBg();
        sound.playAlert();
        this.timerReset();
        this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
    }


    updateScoreBoard() {
        this.gameScore.innerHTML = this.carrotCount - this.score;
    }
    
    timerReset() {
        this.timeZone.innerHTML = `0:${this.gameDuration}`;
        clearInterval(this.timer);
    }
    
    hiddenTimerAndScore() {
        this.timeZone.style.visibility = 'hidden';
        this.gameScore.style.visibility = 'hidden';
    }
    
    startGameTimer() {
        let remainingTimeSec = this.gameDuration; // 타이머 시간 

        console.log("adsf"+remainingTimeSec);
        this.timer = setInterval(()=>{
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.finish(this.carrotCount === this.score);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }
    
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.timeZone.innerHTML = `${minutes}:${seconds}`;
    }
    
    hiddenGameButton() {
        this.icon.classList.remove('fa-stop');
        this.icon.classList.add('fa-play');
    }
    
    showStopButton() {
        this.icon.classList.add('fa-stop');
        this.icon.classList.remove('fa-play');
    }
    
    showTimerAndScore() {
        this.timeZone.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
    // 게임 초기화 
    initGame() {
        this.gameScore.innerHTML = this.carrotCount;
        this.score = 0;
        this.gameField.init();
    }
}