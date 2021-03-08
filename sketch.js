var canvasWidth = 1050;
var canvasHeight = 1050;

var snake,snakeI;
var edges,backgroundI;
var human1,human1I;
var human2,human2I;
var human3,human3I;
var human4,human4I;
var enemyCount = 0;
var food,foodI;

var rightWall = canvasWidth - 120;
var leftWall = 120;
var topWall = 120;
var bottomWall = canvasHeight - 120;

var startLine,midLine,engLine;

var size = 1;
var dirX = 0;dirY = 0;speed = 10;

var level;
var gameState = "run";

function preload(){
    backgroundI = loadImage("bg.png")
}

function setup(){
    createCanvas(canvasWidth,canvasHeight); 
    
    snake = new Snake(100,canvasHeight/2);
    // snake.Arr[0].debug = true;
    
    human1 = new Enemy(canvasWidth - 170,170,2);
    human2 = new Enemy(canvasWidth - 170,canvasHeight - 170,2);
    
    midLine = createSprite(canvasWidth - 300,canvasHeight/2,10,canvasHeight);
    // midLine.visible = false;
    // midLine.debug = true;
    
    endLine = createSprite(canvasWidth-5,canvasHeight/2,10,80);
    // endLine.visible = false;

    level = 1;
}

function draw(){
    background(backgroundI);
    if(gameState == "play"){
        food.eaten(snake.Arr[0]);
        humans();
    }
    
    
    snake.drawTail();
    snake.update();
    controls();
    stateCheck();
    collide();
    drawSprites();
    levelCheck();
}

function stateCheck(){
    if(midLine.isTouching(snake.Arr[0]) && gameState != "play"){
        gameState = "play";
        food = new Food();
    }
    if(snake.Arr[0].isTouching(endLine)){
        gameState = "end";
    }
    if(size <= 0){
        gameState = "over";
    }
}

function controls(){
    if(keyDown("d") && dirX != -1){
        dirX = 1;
        dirY = 0;
    }
    if(keyDown("a") && dirX != 1){
        dirX = -1;
        dirY = 0;
    }
    if(keyDown("w") && dirY != 1){
        dirX = 0;
        dirY = -1;
    }
    if(keyDown("s") && dirY != -1){
        dirX = 0;
        dirY = 1;
    }

    if(keyDown("p")){
        frameRate(0);
    }
}

function collide(){
    if(snake.Arr[0].x >= rightWall){
        snake.Arr[0].x = canvasWidth - 125;
        dirX = 0;
        dirY = 0;
    }
    if(snake.Arr[0].x <= leftWall){
        snake.Arr[0].x = 125;
        dirX = 0;
        dirY = 0;
    }
    if(snake.Arr[0].y >= bottomWall){
        snake.Arr[0].y = canvasHeight - 125;
        dirX = 0;
        dirY = 0;
    }
    if(snake.Arr[0].y <= topWall){
        snake.Arr[0].y = 125;
        dirX = 0;
        dirY = 0;
    }
    if(human1.sprite && human2.sprite){
        human1.sprite.collide(human2.sprite);
        human2.sprite.collide(human1.sprite);
    }
}

function humans(){
    if(human1){
        human1.chase();
        human1.catch(1);
        human1.death(1);
    }
    if(human2){
        human2.chase();
        human2.catch(1);
        human2.death(1);
    }
    if(human3){
        human3.chase();
        human3.catch(1);
        human3.death(1);
    }
    if(human4){
        human4.chase();
        human4.catch(1);
        human4.death(1);
    }
}

function levelCheck(){
    if(gameState == "play" && enemyCount == 0){
        rightWall = canvasWidth + 20;
    }
    if(gameState == "end"){
        level++;
        levelChange();
        gameState = "run";
        snake.Arr[0].x = 100;
        snake.Arr[0].y = canvasHeight/2;
    }
    console.log(level);
}

function levelChange(){
    if(gameState == "end"){
        switch(level){
            case 2: human1 = new Enemy(canvasWidth - 170,170,2);
            human2 = new Enemy(canvasWidth - 170,canvasHeight - 170,2);
            human3 = new Enemy(170,170,2);
                break;
            
            case 3: human1 = new Enemy(canvasWidth - 170,170,3);
            human2 = new Enemy(canvasWidth - 170,canvasHeight - 170,3);
            human3 = new Enemy(170,170,3);
                break;
            
            case 4: human1 = new Enemy(canvasWidth - 170,170,4);
            human2 = new Enemy(canvasWidth - 170,canvasHeight - 170,4);
            human3 = new Enemy(170,170,4);
            human4 = new Enemy(170,canvasHeight - 170,4);
                break;
        }
    }    
}