const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var myEngine;
var myWorld;

var ground, leftground, rightground;
var rope;
var bridge;

var constraint;
var jointpoint, jointlink;
var stones = [];

var zombie;
var breakbutton;
var bg

var axeImg, backgroundImg, stoneImg, woodImg, zombie1Img, zombie2Img, zombie3Img, zombie4; 

function preload()
{
  axeImg = loadImage("assets/axe.png");
  backgroundImg = loadImage("assets/background.png");
  stoneImg = loadImage("assets/stone.png");
  woodImg = loadImage("assets/wood.png");
  zombie1Img = loadImage("assets/zombie1.png")
  zombie2Img = loadImage("assets/zombie2.png")
  zombie3Img = loadImage("assets/zombie3.png")
  zombie4Img = loadImage("assets/zombie4.png")
}




 

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  myEngine = Engine.create();
  myWorld = myEngine.world;
  frameRate(80);
  
  

  zombie = createSprite(width/2, height-110);
  zombie.addAnimation("zombolefttoright", zombie1Img, zombie2Img, zombie1Img);
  zombie.addAnimation("zombierighttoleft", zombie3Img, zombie4Img, zombie3Img);
  zombie.velocityX = 10;
  zombie.scale = 0.1

  ground = new Base(0,height-10,width*2,20,"white",true);
  leftground = new Base(200,height/2 +50,400,100,"white",true);
  rightground = new Base(width-230,height/2 +50,650,100,"white",true);

  bridge = new Bridge(15,{x:width/2 -400, y:height/2});
  jointpoint = new Base(width-600,height/2 +10, 40,20, "white",true);

  Matter.Composite.add(bridge.body, jointpoint);
  jointlink = new Link(bridge, jointpoint);
  
   for(var i=0; i<= 8; i++)
  {
      var x = random(width/2 - 200, width/2 + 300)
      var y = random(-10,140);
      var stone = new Stone(x,y, 80, 80);
      stones.push(stone);
  }

  breakbutton = createButton("");
  breakbutton.class("breakbutton");
  breakbutton.position(width-200, height/2 -50);
  breakbutton.mousePressed(handleButtonPress);

}

function draw() {
  background("white");
  Engine.update(myEngine);


  ground.display();
  leftground.display();
  rightground.display();

  bridge.show();

  for(var stone of stones)
  {
    stone.display();
  }

   if (zombie.position.x >= width - 300) {
    zombie.velocityX = -10;
    zombie.changeAnimation("zombierighttoleft");
  }

  if (zombie.position.x <= 300) {
    zombie.velocityX = 10;
    zombie.changeAnimation("zombolefttoright");
  }
 
  drawSprites();
}

function handleButtonPress()
{
  jointlink.dettach();
  setTimeout(()=> {
    bridge.break();
  },1500
  );
} 