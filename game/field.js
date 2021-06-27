'use strict';

const carrotSound = new Audio('./sound/carrot_pull.mp3'); 
const CARROT_SIZE = 80;

export default class Field{

    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game-section');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);
    }

    init(){
        this.field.innerHTML = "";
        this._addItem('carrot',5,'./img/carrot.png');
        this._addItem('bug',5,'./img/bug.png');
    }
    // 당근과 벌레 생성 함수
    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1,x2);
            const y = randomNumber(y1,y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    onClick(event){
        const target = event.target;
        if (target.matches('.carrot')) {
            // 당근
            target.remove();
            playSound(carrotSound);
            this.onClick && this.onItemClick('carrot');
        }else if (target.matches('.bug')) {
            this.onClick && this.onItemClick('bug');
        }
    }

}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}