var path,mainCyclist, restart
var pathImg,mainRacerImg1,mainRacerImg2;
var obstaclesG, opponentsG

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
}

function setup(){
  
createCanvas(500,300);
  
opponentsG = new Group();
obstaclesG = new Group();
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
mainCyclist.debug = true;  
mainCyclist.setCollider("rectangle", 0, 0, 500, 1000);  
restart = createSprite(227, 197, 60, 30);  
}

function draw() {
  background(0);
  
  restart.visible = false;
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY) {
   spawnOpponents(); 
   spawnObstacles(); 
    
   restart.y = 250
    
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  path.velocityX = -7;  
    
  distance = distance+1
    
  if(mainCyclist.isTouching(opponentsG)) {
      gameState = END;
    }  
    
  if(mainCyclist.isTouching(obstaclesG)) {
    gameState = END
  }   
 }
   else if(gameState == END) {
     
     text("Click HERE to Restart", 150, 200);
     restart.y = 197
     
     if(mousePressedOver(restart)) {
       reset();
     }
     
     obstaclesG.setVelocityXEach(0);
     opponentsG.setVelocityXEach(0);
     path.velocityX = 0
     
     obstaclesG.setLifetimeEach(-1);
     opponentsG.setLifetimeEach(-1);
   }
}

function spawnOpponents() {
  if(frameCount % 120 === 0) {
    var opponents = createSprite(200, 200, 20, 50);
    opponents.shapeColor = ("grey");
    
    opponents.y = (random(60, 240));
    opponents.x = (random(-50, -300));
    
    opponents.velocityX = 2
    
    opponentsG.add(opponents);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacles = createSprite(200, 200, 20, 50);
    obstacles.shapeColor = ("red");
    
    obstacles.y = (random(60, 240));
    obstacles.x = (random(550, 800));
    
    obstacles.velocityX = path.velocityX;
    
    obstacles.lifetime = 200;
    
    obstaclesG.add(obstacles);
  } 
} 

function reset() {
  gameState = PLAY;
       
  obstaclesG.destroyEach();
  opponentsG.destroyEach();
         
  distance = 0;
}