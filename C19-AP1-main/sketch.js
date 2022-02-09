var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var spookySound;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImg);

  spookySound.loop();

}

function draw() {
  
  background(200);
  
  if(gameState == "play"){

  if(keyDown("left_arrow")){
  ghost.x = ghost.x -6;

  }

  if(keyDown("right_arrow")){
    ghost.x = ghost.x +6;
  
  }

  if(keyDown("space")){
    ghost.velocityY = -10;
      
  }

  ghost.velocityY = ghost.velocityY +0.8;

  if(tower.y > 400){
      tower.y = 300
    }

  if(climbersGroup.isTouching(ghost)){
  ghost.velocityY = 0;
  ghost.velocityX = 0;
  }

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
  ghost.destroy();
  gameState = "end";
  }
  
  spawnDoors();

drawSprites();
  }
  
  if(gameState == "end"){
    stroke("red");
    fill("black");
    background("black");
    textSize(30);
    text("GameOver",230,250);
    
  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
  door = createSprite(200,-50);
  door.addImage(doorImg);
  door.x = Math.round(random(120,400));
  door.velocityY = 1;
  door.lifetime = 800;
  doorsGroup.add(door);
  
  climber = createSprite(200,20);
  climber.addImage(climberImg);
  climber.x = door.x;
  climber.velocityY = 1;
  climber.lifetime = 800;
  climbersGroup.add(climber);

  ghost.depth = door.depth +1;
  climber.depth = climber.depth +1;

  invisibleBlock = createSprite(200,25);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
  invisibleBlock.x = door.x;
  invisibleBlock.velocityY = 1;
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.visible = false;


  }
  
}


