var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, bg, fruits, r, score, fruitsGroup, enemyGroup;

var swordImage, gameOver, fruit1, fruit2, fruit3, fruit4, monsterImage, bgImage;

var knife, gameOverBoom;

function preload() {

  swordImage = loadImage("sword.png");
  gameOver = loadImage("gameover.png");
  fruit1 = loadImage("fruit1.png")
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png")
  fruit4 = loadImage("fruit4.png")
  monsterImage = loadAnimation("alien1.png", "alien2.png")
  bgImage = loadImage("sasta-ninja.jpg")
  knife = loadSound("Super.mp3");
  gameOverBoom = loadSound("zapsplat.mp3");

}

function setup() {
createCanvas(400,400)
  bg = createSprite(200, 200, 500, 500);
  bg.addImage(bgImage);
  bg.scale = 1.5
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7;

  fruitsGroup = new Group();
  enemyGroup = new Group();

  sword.setCollider("rectangle", 5, 3, 60, 100)

  score = 0;

}

function draw() {

  background("white");



  sword.y = World.mouseY;
  sword.x = World.mouseX;

  sword.debug = false;

  if (gameState === 1) {

    if (fruitsGroup.isTouching(sword)) {
      fruitsGroup.destroyEach();
      score = score + 1;
      knife.play();
    }
    fruits();
    Enemy();

    if (enemyGroup.isTouching(sword)) {
      gameState = 0;
      gameOverBoom.play();
    }
  }
  else if (gameState === 0) {

    enemyGroup.destroyEach();
    fruitsGroup.destroyEach();
    enemyGroup.setVelocityXEach(0);
    fruitsGroup.setVelocityXEach(0);
    sword.addImage(gameOver);
    sword.x = 200;
    sword.y = 200;
  }



  drawSprites();

textSize(25)
stroke("lime")
strokeWeight(5)
fill("red")
  text("Score: " + score, 160, 30);

}

function fruits() {

  if (World.frameCount % 80 === 0) {
    position = Math.round(random(1, 2));
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else if (r == 4) {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 340));

    if (position == 1) {
      fruit.x = 400;
      fruit.velocityX = -(7 + (score / 4));
    }
    else

      if (position == 2) {
        fruit.x = 0;
        fruit.velocityX = (7 + (score / 4));

      }



    fruit.setLifetime = 100;

    fruitsGroup.add(fruit);

  }
}

function Enemy() {

  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage)
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -(8 + (score / 10));
    monster.setLifetime = 50;

    enemyGroup.add(monster);
  }
}












