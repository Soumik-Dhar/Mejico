var score = [0, 0];
var lives = [6, 6];
var started = true;

// checking whether user has pressed any key
document.addEventListener("keydown", function() {
  // keeping track of number of key presses
  if (started) {
    started = false;
    // clearing out the title
    document.querySelector(".title").innerHTML = "Game On! <br> Let's go!";
    // toggling roll button visibility for player 2
    togglePlayer(2);
  }
});

// handling click event for player 1's roll
document.querySelector(".roll1").addEventListener("click", function() {
  // getting score for player 1
  getScore(1);
});

// handling click event for player 2's roll
document.querySelector(".roll2").addEventListener("click", function() {
  // getting score for player 2
  getScore(2);
});

function getScore(index) {
  // generating score by calling rollDice()
  score[index - 1] = rollDice(index, 1) * 10 + rollDice(index, 2);
  // displaying generated score
  document.querySelector(".score" + index).textContent = score[index - 1];
  // toggling roll button visibility after turn
  togglePlayer(index);
  // deciding round winner by calling gameManager() after player 2 rolls
  if (index === 2)
    gameManager();
}

// function to simulate dice rolls
function rollDice(player, index) {
  var query = ".player" + player + "dice" + index;
  // generating a pseudo-random number resembling the outcome of a die roll
  var roll = Math.floor(Math.random() * 6) + 1;
  var dice = "assets/images/dice" + roll + ".png";
  var audio = new Audio("assets/sounds/dice-roll.mp3");
  // animating the dice roll
  animateShuffle(query, dice);
  audio.play();
  // returning the value to getScore()
  return roll;
}

// function to decide winner based on score[]
function gameManager() {
  // if player 1 scores less than player 2
  if (score[0] < score[1]) {
    document.querySelector(".title").innerHTML = "Player 2 wins <br> this round!";
    // reducing life of player 1
    updateLives(1);
    // if player 2 scores less than player 1
  } else if (score[0] > score[1]) {
    document.querySelector(".title").innerHTML = "Player 1 wins <br> this round!";
    // reducing life of player 2
    updateLives(2);
  }
}

// function to update player lives after every turn till end of game
function updateLives(player) {
  // decrementing life of player by 1
  var index = --lives[player - 1];
  var query = ".player" + player;
  var dice = "assets/images/dice" + index + ".png";
  // animating round result after each turn
  animateRound(player, query, dice);
  // game ends as soon as a player loses all lives
  if (lives[0] === 0 || lives[1] === 0) {
    document.querySelector(query + " h4").textContent = "DEAD!";
    gameOver();
  }
}

//function to animate results of each round
function animateRound(player, query, dice) {
  // animating the player heading and lives left div
  document.querySelector(query + " h3").style.color = "#cb0101";
  document.querySelector(query + " .lives").style.backgroundColor = "#cb0101";
  setTimeout(function() {
    document.querySelector(query + " h3").style.color = "#ffffff";
    document.querySelector(query + " .lives").style.backgroundColor = "#222832";
  }, 500);
  // animating lives counter die
  animateShuffle(query + "life", dice);
}

// function to declare winner and show prompt for restaring game
function gameOver() {
  // if player 2 wins
  if (!lives[0])
    document.querySelector(".title").innerHTML = "Player 2 WINS!";
  // if player 1 wins
  else if (!lives[1])
    document.querySelector(".title").innerHTML = "Player 1 WINS!";
  // animating the title
  document.querySelector(".title").classList.add("glow");
  var audio = new Audio("assets/sounds/winner.mp3");
  audio.play();
  // disabling the roll buttons
  document.querySelector(".roll1").style.visibility = "hidden";
  document.querySelector(".roll2").style.visibility = "hidden";
  // prompt for restarting the game
  setTimeout(function() {
    restart();
  }, 2500);
}

// function to load dice and animate rolls
function animateShuffle(query, dice) {
  // setting dice image
  document.querySelector(query).setAttribute("src", dice);
  // animating dice rolls
  document.querySelector(query).classList.add("animate");
  setTimeout(function() {
    document.querySelector(query).classList.remove("animate");
  }, 500);
}

// function to toggle visibility of buttons between turns
function togglePlayer(index1) {
  // index2 equals 2 when index1 equals 1 and vice-versa
  var index2 = index1 % 2 + 1;
  // toggling roll button visibilty of both players
  document.querySelector(".roll" + index1).style.visibility = "hidden";
  document.querySelector(".roll" + index2).style.visibility = "visible";
}

// function to refresh all game values and show game over prompt
function restart() {
  // reducing opacity of page content except title
  for (var i = 1; i < 3; i++) {
    document.querySelector(".score" + i).style.opacity = "0.1";
    document.querySelector(".player" + i).style.opacity = "0.1";
  }
  // bringing up the game over pop up menu
  document.querySelector(".popUp").style.visibility = "visible";
}
