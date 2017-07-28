// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=getRandomInt(1,400);
    this.y=getRandomInt(12,220);
    this.width=100;
    this.height=200;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Create a variable won for player .
      if(player.lives>0 && player.reached <=5){
    var speed=getRandomInt(1,250)*dt;
   this.x +=speed;
    if(this.x>500){
      this.x=-100;
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,this.width,this.height);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player= function(){
  this.sprite = ("images/char-boy.png");
  this.x=200;
  this.y=350;
  this.width=90;
  this.height=160;
  this.reached=0;
  this.lives=5;
}

//The update function of the player class is used to check for collisions
//and update the position of the player to starting values..
player.prototype.update=function(){
var  DidheLose;
  for(var i=0;i<allEnemies.length;i++){
 DidheLose= checkforHit(allEnemies[i].x,allEnemies[i].y,allEnemies[i].width,allEnemies[i].height,player.x,player.y,player.width,player.height);
if(DidheLose){
  console.log("U were killed :(");
  player.x=250;
  player.y=350;
  player.reached=0;
  player.lives -=1;
}
}
};


//this function renders the player on the screen for the first time.
player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite),this.x,this.y,this.width,this.height);

};

//function to move the player sprite according to the key pressed.
player.prototype.handleInput = function (e) {
  if(this.x>9 && this.x<401 && this.y>0 && this.y<401 && !this.won){
 switch (e) {
   case 'left': this.x-=40;
    break;
   case 'up':this.y-=40;
   break;
    case 'right' :this.x+=40;
    break;
    case 'down': this.y+=40;
     break;
 }
 }
 //To ensure he player stays on the screen.
  if(this.x <10){
   this.x=11;
 }else if (this.y<1) {
   this.x=250;
   this.y=350;
   this.reached+=1;
   console.log("You reached the river");
   noofEnemies=getRandomInt(1,6);
   CreateEnemies();
 }else if (this.x>400) {
   this.x=400;
 }else if (this.y>401){
   this.y=400;
 }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[];
var noofEnemies=getRandomInt(1,5);
for(var i=0;i<noofEnemies;i++){
  allEnemies[i]=new Enemy;
}

var player =new player;
//for new positions for the enemy every time the player reaches the river.
var CreateEnemies=function(){
for(var i=0;i<noofEnemies;i++){
  allEnemies[i]=new Enemy;
}
};



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//It is used to generate random position and speed and no.of the enemy bugs.
function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//the function below is used to check for collisions between enemy bugs and the player.
var checkforHit=function(ax,ay,aw,ah,bx,by,bw,bh){
return ax<bx+(bw-25) && ay<by+(bh-120) && bx<ax+(aw-25) && by<ay+(ah-100);
};
