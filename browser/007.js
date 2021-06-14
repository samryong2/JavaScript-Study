const screenLog = document.querySelector('#screen-log');


const xLine = document.querySelector(".x-line");
const yLine = document.querySelector(".y-line");
const target = document.querySelector("img");



addEventListener('load',()=>{
    const targetRect = target.getBoundingClientRect();
    const targetHalfHeigt = targetRect.height/2;
    const targetHalfWidth = targetRect.width/2;

    console.log(targetHalfHeigt);
    console.log(targetHalfWidth);

    document.addEventListener('mousemove', (e)=>{
        screenLog.innerText = 
        `${e.clientX}px, ${e.clientY}px`;
    
        yLine.style.transform = `translateX(${e.clientX}px)`;
        xLine.style.transform = `translateY(${e.clientY}px)`;
        target.style.transform = 
        `translate(${e.clientX}px, ${e.clientY})`;
        
        screenLog.style.transform = `translate(${e.clientX+20}px, ${e.clientY+20}px)`;
    });
})


