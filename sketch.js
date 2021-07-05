var blimp,blimpimage,sky,skyimage,birds,bird1,bird2,bird3,bird4,bird5,bird6,bird7,bird8,coinimage,birdGroup,coinGroup,cloudimage,cloudGroup,coinsound;
var blimpcrashedimage,blimpcrashedsound,birds2;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var score = 0;
function preload(){
blimpimage = loadImage("Blimp.png");
skyimage = loadImage("sky.png");
birds = loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png","bird6.png","bird7.png","bird8.png");
birds2 = loadAnimation("bird8.png");
coinimage = loadImage("coin.png");
cloudimage = loadImage("cloud.png");
coinsound = loadSound("coinsound.wav");
blimpcrashedimage = loadImage("blimpcrashedimage.png");
}
function setup() {
  createCanvas(displayWidth-70,displayHeight-50);

  sky = createSprite(0,0,displayWidth-70,displayHeight-50);
  sky.addImage(skyimage);
  sky.scale=2.5;
  sky.velocityX=-4;

  blimp = createSprite(100,300);
  blimp.addImage(blimpimage);
  blimp.scale=1.8;

 
  
  birdGroup = new Group();
  coinGroup = new Group();
  cloudGroup = new Group();
}

function draw() {
  background(0);


  if(gameState===PLAY){
  if(sky.x<0){
  sky.x=sky.width/2;
  }

  if(keyDown("space")){
  blimp.velocityY=-10;
  }

  blimp.velocityY = blimp.velocityY+0.5
  
  spawnBirds();
  spawnCoins();
  spawnClouds();

  for (var i = 0;i<coinGroup.length ; i++){ 

  if(coinGroup.get(i).isTouching(blimp)){
  coinGroup.get(i).destroy();
  score = score+10;
  coinsound.play();
  }
  }
  for(var j = 0;j<birdGroup.length ; j++){

  
  if(birdGroup.get(j).isTouching(blimp)){
  blimp.addImage(blimpcrashedimage);
 
  blimp.scale = 0.5;
  gamestate = END;
  }
  }
  }
  else if (gamestate === END){
  console.log("OVER");
  blimp.velocityY=0;
  bird.changeAnimation("stop",birds2);
  birdGroup.setVelocityXEach(0);
  sky.velocityX=0;
  coinGroup.setVelocityXEach(0);
  }
  

  
  
  //camera.position.y = blimp.y;
  //camera.position.x = (displayWidth-70)/2

  drawSprites();

  textSize(20);
  fill("yellow");
  strokeWeight(5);
  stroke("green");
  text("SCORE : "+score,displayWidth-200,200);
 
}
function spawnBirds(){
  if (frameCount%100===0){
  bird=createSprite(displayWidth-70,200,20,20);
  bird.addAnimation("flying",birds);
  bird.addAnimation("stop",birds2);
  bird.y=Math.round(random(100,700));
  bird.velocityX=-4;
  bird.scale=0.3;
  birdGroup.add(bird);
  }
  }
  function spawnCoins(){
    if (frameCount%180===0){
    coin=createSprite(displayWidth-70,200,20,20);
    coin.y=Math.round(random(100,700));
    coin.addImage(coinimage);
    coin.velocityX=-4;
    coin.scale=0.3;
    coinGroup.add(coin);
    coin.debug = true
    coin.setCollider("circle",0,0,40);
  }
  }

function spawnClouds(){
    if (frameCount%240===0){
    cloud=createSprite(displayWidth-70,400,30,30);
    cloud.y=Math.round(random(50,800));
    cloud.addImage(cloudimage);
    cloud.velocityX=-3
    cloudGroup.add(cloud);
    }
}