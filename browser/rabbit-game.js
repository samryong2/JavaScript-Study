const findBtn = document.querySelector(".find-rabbit");
const rabbit = document.querySelector(".rabbit");

findBtn.addEventListener("click",(event)=>{
    rabbit.scrollIntoView({behavior:"smooth",block:"center"});
})