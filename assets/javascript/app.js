$(document).ready(() => {

  // GAME SCENE DIVS =======================================
  // =======================================================
  const gameInfo = $("<div id='gameInfo'></div>");
  const pokemon = $("<div id='pokemon'></div>");
  const infoDisplay = $("<div id='infoDisplay'></div>");
  const answer = $("<div id='answer' class='info'></div>");
  const timer = $("<div id='timer' class='info'>10</div>");
  const guessesLeft = $("<div id='guessesLeft'>Guesses Left: </div>");
  const answersField = $("<div id='answersField'></div>");
  const options = $("<div class='options'></div>");
  // BEGINNING SCENE
  const beginning = $("#content").html();
  // END SCENE
  const end = $("<div id='end'></div>");
  const endMessage = $("<div id='endMessage'></div>");
  const scoreDisplay = $("<div id='scoreDisplay'></div>");
  // =======================================================

  let game,
      guesses,
      score,
      seconds,
      pickedPokemon,
      pokemonPicture,
      pokemonName,
      wait;

  let wrongAnswers = [];


  // APP START
  // =========
  init();
  // =========

  function init() {
    $("#content").hide()
    .html(beginning)
    .fadeIn(1500);
    guesses = 3;
    game = false;
    score = 0;
    pokemonName = undefined;
    pokemonPicture = undefined;
    pickedPokemon = [];

    $("#startButton").on("click", function() {
      game = true;
      $("#content").html("")
      .append(gameInfo, answersField);
      $("#gameInfo").append(pokemon, infoDisplay);
      $("#infoDisplay").append(answer, timer, guessesLeft);
      round();
    });
  }

  function round() {
    if(game) {
      wrongAnswers = [];
      answersField.html("");
      wait = true;
      getPokemon();
      seconds = 10;
      $("#answer").html("?");
      $("#guessesLeft").html("Guesses Left: " + guesses);
      $("#pokemon").html(pokemonPicture);
      $(".pokemonPic").hide().fadeIn(2000);
      const timer = setInterval(function() {
        seconds--;
        $("#timer").html(seconds);
        console.log(seconds);
        if(seconds === 0) {
          clearInterval(timer);
          $("#answer").hide().html("Time's Up!").fadeIn(1500);
          guesses--;
          seconds = 10;
          $("#timer").html(seconds);
          $("#guessesLeft").html("Guesses Left: " + guesses);
          if(guesses === 0) {
            // GAME OVER SCENE
            $("#guessesLeft").html("Guesses Left: " + guesses);
            $("#content").html("").append(end);
            endMessage.text("Somewhere, Professor Oak is crying. Resetting in 5 seconds.");
            scoreDisplay.text("Score: " + score);
            end.append(endMessage, scoreDisplay).hide().fadeIn(1000);
            setTimeout(function() {
                location.reload();
              }, 5000);
          } else {
            clearInterval(timer);
            setTimeout(round, 3000);
            // ROUND RESTART
          }
        }
      }, 1000);
      $(".options").on("click", function() {
        if(wait && guesses > 0) {
          wait = false;
          // CORRECT GUESS
          if($(this).text() == pokemonName) {
            console.log("OH SHIT YOU WIN");
            score++;
            if(score == pokemonList.length) {
              $("#content").html("").append(end);
              endMessage.text("You are a true Pokemon Master! Resetting in 5 seconds.");
              scoreDisplay.text("Score: " + score);
              end.append(endMessage, scoreDisplay).hide().fadeIn(1000);
              setTimeout(function() {
                location.reload();
              }, 5000);
            }
            $("#answer").hide().html("It's " + pokemonName).fadeIn(400);
            $(".pokemonPic").addClass("reveal");
            clearInterval(timer);
            seconds = 10;
            $("#timer").html(seconds);
            setTimeout(round, 3000);
          } else {
            guesses--;
            if(guesses == 0) {
              $("#guessesLeft").html("Guesses Left: " + guesses);
              $("#content").html("").append(end);
              endMessage.text("Somewhere, Professor Oak is crying. Stick around to restart.");
              scoreDisplay.text("Score: " + score);
              end.append(endMessage, scoreDisplay).hide().fadeIn(1000);
              setTimeout(function() {
                location.reload();
              }, 5000);
            } else {
              seconds = 10;
              $("#answer").hide().html("Incorrect!").fadeIn(400);
              $("#timer").html(seconds);
              $("#guessesLeft").html("Guesses Left: " + guesses);
              clearInterval(timer);
              setTimeout(round, 1000);
            }
          }
        }
      });
    }
  }

  function getPokemon() {
    pokemonName = undefined;
    pokemonPicture = undefined;
    while(pokemonName == undefined) {
      let picker = Math.floor(Math.random() * pokemonList.length);
      if(pickedPokemon.indexOf(pokemonList[picker].name) == -1) {
        pickedPokemon.push(pokemonList[picker].name);
        pokemonPicture = pokemonList[picker].image;
        pokemonName = pokemonList[picker].name;
      }
    }
    for(let i = 0; i < 3; i++) {
      while(wrongAnswers.length < 3) {
        let picker = Math.floor(Math.random() * pokemonList.length);
        if(pokemonList[picker].name != pokemonName
          && wrongAnswers.indexOf(pokemonList[picker].name) == -1) {
          wrongAnswers.push(pokemonList[picker].name);
        }
      }
    }
    wrongAnswers.push(pokemonName);
    wrongAnswers.sort();
    for(let i = 0; i < 4; i++) {
      $("#answersField").append("<div class='options'></div>");
      $(".options:nth-of-type(" + (i + 1) + ")").text(wrongAnswers[i]);  
    }
  }

});
