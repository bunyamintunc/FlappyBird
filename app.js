document.addEventListener('DOMContentLoaded',()=>{
    const bird=document.querySelector('.bird');
    const gameDisplay= document.querySelector('.game-container');
    const ground=document.querySelector('.ground');
    let span=document.getElementById('skor'); 
    let mesageGameOverSpan=document.getElementById('gameOverMesage');
    let  mesage=document.getElementById('mesage');
    let skor=0;

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
        span.innerHTML=skor;   
        let obstacleLeft=500;
        let randomHeight=Math.random()*60;
        let obstacleBottom=randomHeight;
        let gap = 430;

        const obstacle=document.createElement('div');
        const topObstacle=document.createElement('div');

        if(!isGameOver){
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }
       
        
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle)

        obstacle.style.left=obstacleLeft + 'px';
        topObstacle.style.left=obstacleLeft + 'px';

        obstacle.style.bottom=obstacleBottom + 'px';
        topObstacle.style.bottom=obstacleBottom+gap+'px';

        function moveEleman(){
            

            //oyunu hızlandırıyoruz.
            if(skor>4){
                obstacleLeft-=3;
            }
            else{
                obstacleLeft -=2;
            }
            
            obstacle.style.left=obstacleLeft +'px';
            topObstacle.style.left=obstacleLeft + 'px';

            if(obstacleLeft===-60){
                clearInterval(timeId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if(obstacleLeft>200&&obstacleLeft<280 &&birdLeft==220&&
                (birdBottom < obstacleBottom+153||birdBottom>obstacleBottom+gap-200 )||birdBottom===0){
                  gameOver()
                  clearInterval(timeId)
            }
            
            
        }
        let timeId=setInterval(moveEleman,20)
        if(!isGameOver){
            setTimeout(elemanUret,3000)
        }

        //her uretilen engelde skoru bir arttıryoruz.
        skor +=1;

    }
    elemanUret()

    function gameOver(){
        clearInterval(gameTimerId);
        isGameOver=true;
        skor=0;
        mesageGameOverSpan.innerHTML="Game Over !";
         mesage.classList.add('mesaj')
        document.removeEventListener('keyup',control)

    }


})