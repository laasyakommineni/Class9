
function setup() {
  createCanvas(400,400);
}

var ball;
var score = 0;
var lives = 3, gamestate = "start", lastvx = 0, lastvy =0;
ball = createSprite(200,200,10,10);
ball.setAnimation("golfball_1");
ball.scale = 0.05;
ball.velocityX = 0;
ball.velocityY = 0;
var paddle = createSprite(200, 350, 120, 10);
paddle.shapeColor = color(0,0,255);

createEdgeSprites();
var colors = [color(255,0,0),color(255,165,0), color(0,255,0),color(255,255,0)];
var BRICK_W = 50;
var BRICK_H = 25;
var BRICK_MARGIN = 4;

var offsetY = 80;

bricks = new Group();

  for(var r = 0; r<4; r++)
    for(var c = 0; c<6; c++) {
      var brick = createSprite(65+c*(BRICK_W+BRICK_MARGIN), 80+r*(BRICK_H+BRICK_MARGIN), BRICK_W, BRICK_H);
      brick.shapeColor = colors[r];
      //brick.setAnimation("candy");
      bricks.add(brick);
      brick.immovable = true;
    }



function draw() {
  background("black");
  textSize(20);
  text("Score: "+score,40,25);
  text("Lives:"+lives, 50, 50);
  if(gamestate == "start")
  {
    text("Click to start.", 150, 250);
    ball.velocityX = 0;
    ball.velocityY = 0;
    ball.x = 200;
    ball.y = 200;
  }
  else if(gamestate == "end")
  {
    text("Game Over", 150, 250);
    
    ball.remove();
  }
  else if(gamestate == "pause")
  {
    text("Press space to resume.", 110, 250);
  }
  else
  {
  gameplay();
  }
  if (keyWentDown("space"))
  {
    if(gamestate == "pause")
    {
      gamestate = "play";
      ball.velocityY = lastvy;
      ball.velocityX= lastvx;
    }
    else if(gamestate == "play")
    {
      gamestate = "pause";
      lastvx = ball.velocityX;
      lastvy = ball.velocityY;
      ball.velocityX = 0;
      ball.velocityY = 0;
    }
    
   }
  drawSprites();
}


function brickHit(ball, brick) {
 playSound("sound://category_hits/puzzle_game_button_04.mp3")
 brick.remove();
 score = score+5;
 
 if(ball.velocityY<12 && ball.velocityY>-12)
  { ball.velocityX *= 1.05;
    ball.velocityY *= 1.05;

  }
 
}

function gameplay()
{
  //paddle.x = World.mouseX;
  paddle.x = ball.x
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 340)
  {
    paddle.x = 340;
  }
  drawSprites();
  ball.bounceOff(topEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  //ball.bounceOff(paddle);
  ball.bounceOff(bricks, brickHit);
  if(ball.bounceOff(paddle))
  {
    playSound("sound://category_tap/puzzle_game_organic_wood_block_tone_tap_1.mp3")
  }
  if(ball.isTouching(bottomEdge))
  {
    lifeover();
  }
  
  if(!bricks[0])
  {
    //console.log("Won");
    ball.velocityX = 0;
    ball.velocityY = 0;
    text("Well Done!!",150,200);
  }
  
}

function mousePressed()
{
  if(gamestate == "start")
  {
    gamestate = "play";
    ball.velocityY = -7;
    ball.velocityX= 7;
  
    bricks.setVelocityYEach(0.2); 
  }
  
}

function lifeover()
{
  lives = lives-1;

  if(lives >= 1)
    {
      gamestate = "start";
    }
    else
    {
      gamestate = "end";
    }
}




