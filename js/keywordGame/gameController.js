'use strict';

var scoreText = document.getElementById('score');
var newOne = scoreText.cloneNode(true);

// Perform all the actions required to increase the score
function scoreUp(){
  noLoop();
  bomb.explode();
  loop();
  updateScore(100);
  scoreAnimation();
  getRandomKeyword();
  generateNewBomb();
}

// Update and animate displayed score
function scoreAnimation(){
  scoreText = document.getElementById('score');
  var newOne = scoreText.cloneNode(true);
  scoreText.parentNode.replaceChild(newOne,scoreText);
  newOne.textContent = playerScore;
}


// Turn the game off if gamePlaying is false
function gameOff(){
  //Stop the game when turned to false
  if(gamePlaying === false){
    noLoop();
  }
}

// Control the flow when the bomb hits the computer
function damageChecker(){
  if(bomb.y > canvasHeight * .75){
    computerHealth -= 1;
    document.getElementById('playerIn').value = '';
    getRandomKeyword();
    generateNewBomb();
  }
}

// Controls what gets sent to the computer renderer
function computerHealthSetter(){
  if(computerHealth === 3){
    renderComputer('happy');
  } else if (computerHealth === 2){
    renderComputer('worried');
  } else if(computerHealth === 1){
    renderComputer('sad');
  } else{
    renderComputer();
  }
}

// Controls the speed of the game based of the players score
function gameSpeedSetter(){
  if(playerScore < 300){
    gameSpeed = 1;
  } else if(playerScore >= 300 && playerScore < 600) {
    gameSpeed = 2;
  } else if(playerScore >= 600 && playerScore < 900) {
    gameSpeed = 3;
  } else if(playerScore >= 900 && playerScore < 1200) {
    gameSpeed = 4;
  } else if(playerScore >= 1200 && playerScore < 1500) {
    gameSpeed = 5;
  } else if(playerScore >= 1800 && playerScore < 2100) {
    gameSpeed = 6;
  } else {
    gameSpeed = 7;
  }
}

// Ends the game when the computer health is brought to 0
function gameOver(){
  if(computerHealth === 0){
    noLoop();
    document.getElementById('player').style.visibility = 'hidden';
    document.getElementById('player').textContent = '';
    gameOverTextRenderer();
  }
}

// Render the Game Over Text
function gameOverTextRenderer(){
  var startParent = document.getElementById('start');
  startParent.textContent = '';
  var newPTag = document.createElement('p');
  newPTag.textContent = 'Game Over';
  startParent.appendChild(newPTag);
  startParent.style.visibility = 'visible';
}

// Function to start the game
function gameOn(){
  gamePlaying = true;
  loop();
}

// Large Ugly function that controls the flow of the game
function gameController(){
  gameOff();
  damageChecker();
  computerHealthSetter();
  gameSpeedSetter();
  gameOver();
}
