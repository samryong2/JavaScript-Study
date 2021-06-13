const screenLog = document.querySelector('#screen-log');
document.addEventListener('mousemove', logKey);

const xLine = document.querySelector(".x-line");
const yLine = document.querySelector(".y-line");
const target = document.querySelector(".target");


function logKey(e) {
    screenLog.innerText = `
    Screen X/Y: ${e.screenX}, ${e.screenY}
    Client X/Y: ${e.clientX}, ${e.clientY}`;

    screenLog.style.left = `${e.clientX}px`;
    screenLog.style.top = `${e.clientY}px`;

    yLine.style.left = `${e.clientX}px`;
    target.style.left = `${e.clientX}px`;
    xLine.style.top = `${e.clientY}px`;
    target.style.top = `${e.clientY}px`;

}
