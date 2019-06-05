//MAP
let map = document.querySelector('.map');
//Game over popup
let gameOver = document.querySelector('.gameover'),
    scoreTable = document.querySelector('.score'),
    highRecordTable = document.querySelector('.high-record'),
    score = 0,
    highRecord = 0;

for(let i = 1; i < 101; i++) {
    let block = document.createElement('div');
        block.classList.add('block');
        map.appendChild(block);
}

let x = 1, y = 10,
    block = document.querySelectorAll('.block');
for(let i = 0; i < block.length; i++) {
    if(x > 10){
        x = 1;
        y--;
    }
    block[i].setAttribute('posX', x),
    block[i].setAttribute('posY', y);
    x++;
}

//Map end*//

//Snake
let randomPos = () => {
    posX = Math.floor(Math.random() * 7 + 1 );
    posY = Math.floor(Math.random() * 10 + 1 );
    return [posX, posY];
},
snakePos = randomPos(),
snakeBody = [
    document.querySelector(`[posX = '${snakePos[0]}'][posY = '${snakePos[1]}']`),
    document.querySelector(`[posX = '${snakePos[0]+1}'][posY = '${snakePos[1]}']`),
    document.querySelector(`[posX = '${snakePos[0]+2}'][posY = '${snakePos[1]}']`)
],
fillSnake = () => {
    snakeBody.forEach((item, i) => {
            item.classList.add('snake');
    });    
};
fillSnake();

let foodRandomPos = () => {
    foodPos = [Math.floor(Math.random() * 10 + 1 ),
               Math.floor(Math.random() * 10 + 1 )];
    snakeBody.forEach((item, i) => {
            posX = item.getAttribute('posX'),
            posY = item.getAttribute('posY');
            if(posX == Number(foodPos[0]) && posY == Number(foodPos[1])){
                foodPos = [Math.floor(Math.random() * 10 + 1 ),
                           Math.floor(Math.random() * 10 + 1 )];
            }
    });
    return foodPos;
},
foodPos, food,
foodPlace = () => {
    foodPos = foodRandomPos();
    console.log(foodPos)
    food = document.querySelector(`[posX = '${foodPos[0]}'][posY = '${foodPos[1]}']`); // не забыть
    food.classList.add('food');
};






let direction = 'right',
    snakeMove = () => {
    let headPos = [snakeBody[snakeBody.length -1].getAttribute('posX'),snakeBody[snakeBody.length -1].getAttribute('posY')];

       let snakeDirection = (condition, dir, dirCarry, eatDirX, eatDirY) => {
            snakeBody[0].classList.remove('snake');

            snakeBody.forEach((item, i) => {
                if(i < snakeBody.length-1){
                    posX = item.getAttribute('posX'),
                    posY = item.getAttribute('posY');
                    if (posX == Number(headPos[0]) && posY == Number(headPos[1])){
                        if(highRecord < score) {
                            highRecord = score;
                            highRecordTable.innerText = `High Score: ${score}!`;
                        }
                        gameOver.style.display = 'flex';
                        clearInterval(snakeMoveInt);
                    snakeBody = '';
                    }
                }
            });
            if(snakeBody.length > 1){
                if(Number(foodPos[0]) == Number(headPos[0]) && Number(foodPos[1]) == Number(headPos[1])){
                    console.log('eat');
                    score += 1;
                    scoreTable.innerText = `score: ${score}`;
                    food.classList.remove('food');
                    setTimeout(foodPlace, 500);
                } else {
                    snakeBody.shift();
                }
    
                if (condition){
                    snakeBody.push(dir);
                } else {
                    snakeBody.push(dirCarry);
                } 
                fillSnake();
            }
            

        },
    snakeMoveDir = {
        right: [
            headPos[0] < 10,
            document.querySelector(`[posX = '${Number(headPos[0])+1}'][posY = '${Number(headPos[1])}']`),
            document.querySelector(`[posX = '${Number(1)}'][posY = '${Number(headPos[1])}']`)

        ],
        left: [
            headPos[0] > 1,
            document.querySelector(`[posX = '${Number(headPos[0])-1}'][posY = '${Number(headPos[1])}']`),
            document.querySelector(`[posX = '${Number(10)}'][posY = '${Number(headPos[1])}']`)
        ],
        up: [
            headPos[1] < 10,
            document.querySelector(`[posX = '${Number(headPos[0])}'][posY = '${Number(headPos[1])+1}']`),
            document.querySelector(`[posX = '${Number(headPos[0])}'][posY = '${Number(1)}']`)
        ],
        down: [
            headPos[1] > 1,
            document.querySelector(`[posX = '${Number(headPos[0])}'][posY = '${Number(headPos[1]-1)}']`),
            document.querySelector(`[posX = '${Number(headPos[0])}'][posY = '${Number(10)}']`)
        ]
    };   
    
    if(direction == 'right'){
        snakeDirection(snakeMoveDir.right[0],snakeMoveDir.right[1],snakeMoveDir.right[2], -1, null);
    } else if(direction == 'left'){
        snakeDirection(snakeMoveDir.left[0],snakeMoveDir.left[1],snakeMoveDir.left[2], +1, null);
    } else if(direction == 'up'){
        snakeDirection(snakeMoveDir.up[0],snakeMoveDir.up[1],snakeMoveDir.up[2], null, -1);
    } else if(direction == 'down'){
        snakeDirection(snakeMoveDir.down[0],snakeMoveDir.down[1],snakeMoveDir.down[2], null, 1);
    }
    


};
start = () => {
        score = 0;
        scoreTable.innerText = `score: ${score}`;
        direction = 'right';
        snakeMoveInt = setInterval(snakeMove, 100);
        setTimeout(foodPlace, 500);
};
start();


window.addEventListener('keydown', (e) =>{
    if(e.keyCode == 37) {
        if(direction != 'right'){
            direction = 'left';
        }
    } else if(e.keyCode == 38) {
        if(direction != 'down'){
            direction = 'up';
        }
    } else if(e.keyCode == 39) {
        if(direction != 'left'){
            direction = 'right';
        }
    } else if(e.keyCode == 40) {
        if(direction != 'up'){
            direction = 'down';
        }
    }
});


//Background select
let bg1 = document.querySelector('.bg-first'),
    bg2 = document.querySelector('.bg-second'),
    body = document.querySelector('body');

    bg1.addEventListener('click', () => {
        body.style.cssText = `background: url(bg.jpg) no-repeat center / cover;`;
    });
    bg2.addEventListener('click', () => {
        body.style.background = `url(bg2.jpg) no-repeat center / cover`;
    });


//Restart
let restartBtn = document.querySelector('#restart'),
restart = () => {
let block = document.querySelectorAll('.block');
    gameOver.style.display = 'none';
    block.forEach((item) => {
        item.classList.remove('snake');
        item.classList.remove('food');
    });
    snakeBody = '';
    food = '';
    snakePos = randomPos(),
    snakeBody = [
        document.querySelector(`[posX = '${snakePos[0]}'][posY = '${snakePos[1]}']`),
        document.querySelector(`[posX = '${snakePos[0]+1}'][posY = '${snakePos[1]}']`),
        document.querySelector(`[posX = '${snakePos[0]+2}'][posY = '${snakePos[1]}']`)
    ];
    start();
    

};
restartBtn.addEventListener('click', () =>{
    restart();
});