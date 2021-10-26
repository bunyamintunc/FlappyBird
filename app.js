document.addEventListener('DOMContentLoaded',()=>{
    const bird=document.querySelector('.bird');
    const gameDisplay= document.querySelector('.game-container');
    const ground=document.querySelector('.ground');

    let birdLeft=220;
    let birdBottom=100;
    let gravitiy=2;
    let isGameOver=false;

    function startGame(){
       birdBottom -= gravitiy
       bird.style.bottom=birdBottom + 'px';
       bird.style.left=birdLeft + 'px';
    }
   
    let gameTimerId=setInterval(startGame,20);

    function control(e){
       if(e.keyCode==32){
           jump()
       }
    }


    function jump(){

       if(birdBottom<500){ birdBottom+=50;}
       bird.style.bottom=birdBottom + 'px';
    }
    document.addEventListener('keyup',control)

    function elemanUret(){
        let elemanLeft=500
        let randomHeight=Math.random()*60
        let elemanBottom=randomHeight

        const eleman=document.createElement('div');
        eleman.classList.add('obstacle')
        gameDisplay.appendChild(eleman);
        eleman.style.left=elemanLeft + 'px'
        eleman.style.bottom=elemanBottom + 'px'

        function moveEleman(){
            elemanLeft -=2
            eleman.style.left=elemanLeft +'px'

            if(elemanLeft===-60){
                clearInterval(timeId)
                gameDisplay.removeChild(eleman)
            }
            if(elemanLeft>200&&elemanLeft<280 &&birdLeft==220&&
                birdBottom < elemanBottom+153 ||birdBottom===0){
                  gameOver()
                  clearInterval(timeId)
            }
        }
        let timeId=setInterval(moveEleman,20)
        if(!isGameOver){
            setTimeout(elemanUret,3000)
        }

    }
    elemanUret()

    function gameOver(){
        clearInterval(gameTimerId);
        isGameOver=true;
        document.removeEventListener('keyup',control)

    }


})