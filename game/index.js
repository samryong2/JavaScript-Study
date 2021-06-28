'use strict';

import PopUp from "./popup.js";
import Game from "./game.js";

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const CARROT_SIZE = 80;         // 당근 이미지 사이즈
const GAME_DURATION_SEC = 5;

const gameFinishBanner = new PopUp();
const game = new Game(1,20,20);
game.setGameStopListener((reason)=>{
    console.log(reason);
    let message;
    switch (reason) {
        case 'cancel':
            message = 'Replay?';
            break;
    
        case 'win':
            message = 'YOU WON!';
            break;
        case 'lose':
            message = 'YOU LOST';
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showPopUpWithText(message);
})

gameFinishBanner.setClickListener(()=>{
    game.start();
})


