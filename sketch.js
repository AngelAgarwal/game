var ground;
var unicorn, unicornImage ,unicornImage2, unicornJump;
var mud,mudImg;
var mud2;

// g = ground
var bg,g;

var life1, life2, life3;
var lifeImg;

var score = 0;
var heart = 3;

var enemyGroup;
var won, wonImg;
var gameState = "run";
var cloud, cloudImg;

var r;

var donut, donutImg;

function preload(){
   lifeImg = loadImage("life.png");
  
    mudImg = loadImage("mud.png")
    cloudImg=loadImage("cloud.png")
    unicornImage = loadImage("walking.png")
  //  unicornImage2 = loadImage("rarity2.png")
    unicornJump  = loadImage("jump.png");
    restartImg = loadImage("restart.png")
    lose = loadImage("collide.png");
    wonImg = loadImage("won.png")
    //lose = loadImage("lose.png")
   // g=loadImage("ground.png")
    bg = loadImage("bg.png");

    mud2 = loadImage("snowball.png")

    donutImg = loadImage("donut.png")

  }

function setup(){


    createCanvas(1250,550);

    // creating the unicorn sprite

    unicorn = createSprite(100,490,10,10)
    unicorn.addImage(unicornImage)
    //unicorn.scale = 0.2
    unicorn.debug = true
    unicorn.setCollider("rectangle",0,0,300,300)

    ground = createSprite(600,650,1500,330)
    ground.shapeColor = "green"
    //ground.addImage(g)
    life1 = createSprite(1150,50,10,10)
    life1.addImage(lifeImg)
    life1.scale= 0.2;

    life2 = createSprite(1100,50,10,10)
    life2.addImage(lifeImg)
    life2.scale= 0.2;

    life3 = createSprite(1050,50,10,10)
    life3.addImage(lifeImg)
    life3.scale= 0.2;

    r = createSprite(500,350, 10,10)
    r.addImage(restartImg)
    r.scale = 0.5;
    r.visible = false;
    
  //creating groups for enemy
    enemyGroup = new Group();
    food = new Group();
    cloudGroup = new Group();
}

function draw(){
    background(bg)
    
  if(heart===3){
      life3.visible = true
      life1.visible = true
      life2.visible = true
    }
    if(heart===2){
      life2.visible = true
      life1.visible = true
      life3.visible = false
    }
    if(heart===1){
      life1.visible = true
      life3.visible = false
      life2.visible = false
    }
//go to gameState "lost" when 0 lives are remaining
if(heart===0){
  gameState = "lost"
  
}
if(score==10){
  gameState = "won"
 
}
//moving the unicorn up
if(keyDown("SPACE")&& unicorn.y  >= height-320){
  unicorn.y =unicorn.y-80
  unicorn.addImage(unicornJump)
  unicorn.scale = 0.4
  unicorn.setCollider("rectangle",0,0,150,150)
  console.log("up")
  
   //text("press space key to jump",250,50).visible = false;
    
}
unicorn.velocityY = unicorn.velocityY + 0.8
if(unicorn.y>450){
 unicorn.addImage(unicornImage)
 unicorn.scale = 0.20;
 unicorn.velocityY = 0
 unicorn.setCollider("rectangle",0,50,400,400)
 console.log("hii")
}

   if(unicorn.isTouching(enemyGroup)){
    heart = heart -1;
    enemyGroup.destroyEach()
   }

   if(food.isTouching(unicorn)){
    food.destroyEach();
    score = score + 1;
  }
    // calling the function to spawn mud and clouds
enemy();
spawnClouds();
spawnDonut();



unicorn.collide(ground);

 
  
  drawSprites();

  textSize(20)
  fill("black")
  text("Score:" + score,100,50)

  textSize(20)
  fill("black")
  text("Heart:"+heart ,1050,125)

  textSize(20)
    fill("blue")
    text("press space key to jump",250,50)
    
  // gamestate is lost
  if(gameState === "lost"){

    textSize(50)
    fill("red")
    text("You Lost ",550,250)
    unicorn.addImage(lose)
    unicorn.scale=0.5
   //unicorn.x=400;
  //unicorn.y = 200;
    unicorn.velocityY = 0
    unicorn.debug = false;
    ground.visible = false;
    life1.destroy();
    life2.destroy();
    life3.destroy();
    enemyGroup.destroyEach();
    cloudGroup.destroyEach();
    restart();
    food.destroyEach();
    r.visible = true
  }
  else if(gameState === "won"){
 
    textSize(100);
    fill("red");
    text("You Won ",350,250);
    unicorn.addImage(wonImg);
    unicorn.scale = 0.6;
    enemyGroup.destroyEach()
    cloudGroup.destroyEach()
  //  restart();
    food.destroyEach();
    r.visible = true
  }

  
}

// creating function

function enemy(){
   if (frameCount%150 === 0){

    mud = createSprite(random(1250,1550),480,40,40)
    mud.addImage(mudImg)
    mud.scale = 0.2;
    mud.velocityX = -8
    mud.debug= true;
    mud.setCollider("rectangle",0,0,400,400)
   
    mud.lifetime = 400
    
    console.log("enemy")
    
    mud.velocityX = -(6 + 6*score/100);

    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1:mud.addImage(mudImg);
              break;
      case 2:mud.addImage(mud2);
             mud.scale = 0.3
             mud.setCollider("rectangle",0,0,50,50)
              break;
      default: break;
    }
    enemyGroup.add(mud)
   }
  
}

function spawnDonut(){
  if(frameCount%250 === 0){
  
    var donut = createSprite(random(1250,1550),450,10,10)
     donut.addImage(donutImg)
     donut.scale =0.1;
     donut.velocityX=-9
     donut.debug= false;
     donut.setCollider("rectangle",0,0,500,500)
     food.add(donut)
  }
 
}

function spawnClouds(){
  if(frameCount%50 === 0){

  cloud = createSprite(random(1450,1550),random(100,150),50,50)
  cloud.addImage(cloudImg)
  cloud.scale =0.2;
  cloud.velocityX = -4
  cloud.lifetime = 450
  cloudGroup.add(cloud)

  
 }
}

function restart(){
 
 // ground.visible=true;
 // unicorn.changeAnimation();
  
  //score = 0;
 // score =0;
 
}
