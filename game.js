var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = true;
var level = 0;

$(document).on("keydown", function () {
  if (started === true) {
    $("h1").text("Level 0");
    nextSequence();
    started = false;
  }
});

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userChosenColour);
});

function checkAnswer(currentColor) {
  if (currentColor === gamePattern[userClickedPattern.length - 1]) {
    if (userClickedPattern.length === level) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $(document.body).addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $(document.body).removeClass("game-over"), 200;
    });

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = true;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = randomIntFromInterval(0, 3);
  var randomChosenColour = buttonColors[randomNumber];
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
