var monkey, monkey_running, monkey_collided;
var ground, invisibleGround, groundImage;

 

var banana_group, banana_img;
var obstaclesGroup

 

var score= 0;
var score1 = 0;

 

var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover, restart;

 

function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  groundImage = loadImage("jungle.jpg")
  
  banana_img = loadImage("banana.png")
  
  obstacle_img = loadImage("stone.png")
}

 

 

 

function setup() {
  createCanvas(400, 400);
  
  
  
  invisibleGround = createSprite(200,365,400, 20)
  
  ground = createSprite(200,200,400,400)
  ground.addAnimation("movebg",groundImage )
  
  monkey = createSprite(50,350,20,30)
  monkey.addAnimation("runnig", monkey_running)
  monkey.scale = 0.1
  monkey.setCollider("rectangle",2,2,2,2)

 

  
   banana_group = new Group();
  
  obstaclesGroup = new Group();
}

 

function draw() {
  background(220);
  
  monkey.debug = true

 

  
 
  
  if (gamestate === PLAY)
  {
    ground.velocityX = -(6+3*score/100)
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("space")&& monkey.y >= 344) {
      monkey.velocityY = -10;
    }

 

    monkey.velocityY = monkey.velocityY + 0.5

 

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

 

    monkey.collide(invisibleGround);
    banana_spawn();
   
    spawnObstacles();
    
     if (obstaclesGroup.isTouching(monkey))
        {
        gamestate = END
        monkey.scale = 0.1
        }
    
    if (monkey.isTouching(banana_group)){
      banana_group.destroyEach()
      score1 = score1 + 10
      
      switch(score1) {
      
      case score1 = 10: monkey.scale = monkey.scale+0.01
                    break;
      case score1 = 20: monkey.scale = monkey.scale+0.01
                    break;
      case score1 = 30: monkey.scale = monkey.scale+0.01
                    break;
      case score1 = 40: monkey.scale = monkey.scale+0.01
                    break;
      case score1 = 50: monkey.scale = monkey.scale+0.02
                    break;
      case score1 = 60: monkey.scale = monkey.scale+0.02
                    break;
      case score1 = 70: monkey.scale = monkey.scale+0.02
                    break;
 
 
      default: break;
    }
      
    }
  }
    
    else if(gamestate === END) {
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    banana_group.setVelocityXEach(0);
    
    //change the trex animation
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    banana_group.setLifetimeEach(-1);
    
    if (mousePressedOver(restart))
    {
      reset()
    }
    
  }
  drawSprites()
  
  textColor = "black"
   text("Score: "+score1,330,30)
}

 

 

function banana_spawn() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(250,350));
    banana.addImage(banana_img);
    banana.scale = 0.05;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    banana_group.add(banana);
  }
  
}

 

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,360,10,40);
    obstacle.velocityX = -(6+3*score/100)
    obstacle.addAnimation("obs", obstacle_img)
 
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

