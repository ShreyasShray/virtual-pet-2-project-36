//Create variables here
var dog, dog_image, happydog_image;
var database;
var food, foodS;
var feed, addFood;
var fedTime, lastFed;

function preload()
{
	//load images here
  dog_image = loadImage("Dog.png");
  happydog_image = loadImage("happydog.png");
}

function setup() {
	createCanvas(1200, 600);

  dog =createSprite(900, 250, 100, 100);
  dog.addImage(dog_image);
  dog.scale = 0.2;

  database = firebase.database();

  food = new Food();
  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  addFood = createButton("Add Food");
  addFood.position(800, 95);
}


function draw() {  
  background(46, 139, 87);
  //add styles here
  fedTime = database.ref("feedTime");
  fedTime.on("value", function(data){
    lastFed = data.val();
  });
  console.log(lastFed)

  drawSprites();
  textSize(20);
  fill("white");
  food.getFoodStock();
  food.display();
  if(foodS){
    console.log(foodS);
  }
  feed.mousePressed(feedDog);
  addFood.mousePressed(addfood);
  if(lastFed !== undefined){
  fill(255, 255, 254);
  textSize(15);
  if(lastFed>12){
    text("Last Fed : " + lastFed - 12 + "P.M", 350, 30);
  }else if(lastFed === 12){
    text("LastFed : " + lastFed + "P.M", 350, 30);
  }else{
    text("Last Fed : " + lastFed + "A.M", 350, 30);
  }
}
}

function feedDog(){
  if(foodS > 0){
    food.deductFood();
    food.updateFoodStock();
    database.ref("/").update({
      feedTime:hour()
    });
    dog.addImage(happydog_image);
  }
}

function addfood(){
  foodS = foodS + 1;
  database.ref("/").update({
    food: foodS
  });
}