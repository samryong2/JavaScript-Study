`use strict`;



window.addEventListener('DOMContentLoaded',(event)=>{
    
})

const section = document.querySelector('.game-section');

const gameSection = document.querySelector('.game-section');

const test = gameSection.getBoundingClientRect();



console.log("left : "+test.left);
console.log("width : "+test.width);
console.log("top : "+test.top);
console.log("bottom : "+test.bottom);

function createBug() {
    
    const bug = document.createElement('img');
    bug.src = './img/bug.png';
    bug.style.position = 'absolute';

    section.appendChild(bug);
    
    bug.style.transform = `translate(${elemXSize()}px, ${elemYSize()}px)`;
}

function elemXSize() {

    
    return Math.random() * test.width;

}

function elemYSize() {
    const aa = test.bottom - test.top;    
    return Math.random() * (test.height);

}

console.log(`elemX : ${elemXSize()} , elemY : ${elemYSize()}`)

createBug();