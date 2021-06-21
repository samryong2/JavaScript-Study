'use strict';
// 당근 이미지 사이즈
const CARROT_SIZE = 80;
// 게임 SECTION
const section = document.querySelector('.game-section');
// 게임 SECTION RECT
const fieldRect = section.getBoundingClientRect();
// 게임 초기화 
function initGame() {
    // 벌레와 당근을 생성한뒤 field에 추가해줌
    console.log(fieldRect);
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

initGame();