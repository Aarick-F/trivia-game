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
      wait,
      time;
  let wrongAnswers = [];


  // APP START
  // =========
  init(); ////
  // =========

  function init() {
    $("#content")
    .html(beginning);
    guesses = 3;
    game = false;
    score = 0;
    pokemonName = undefined;
    pokemonPicture = undefined;
    pickedPokemon = [];
  }

  function round() {
    if(game) {
      wrongAnswers = [];
      answersField.html("");
      wait = true;
      seconds = 10;
      time = setInterval(timeKeeper, 1000);
      let compare = pokemonList.length - (3 - guesses);
      console.log("COMPARE: " + compare);
      if(score < compare) {
        getPokemon();
      } else if(score === compare) {
        // GAME WIN
        stopTimer();
        $("#content").html("").append(end);
        endMessage.text("You are a true Pokemon Master! Resetting in 5 seconds.");
        scoreDisplay.text("Score: " + score);
        end.append(endMessage, scoreDisplay).hide().fadeIn(1000);
        setTimeout(function() {
          location.reload();
        }, 5000);
      } else if(guesses === 0) {
        // GAME LOSE
        stopTimer();
        $("#guessesLeft").html("Guesses Left: " + guesses);
        $("#content").html("").append(end);
        endMessage.text("Somewhere, Professor Oak is crying. Stick around to restart.");
        scoreDisplay.text("Score: " + score);
        end.append(endMessage, scoreDisplay).hide().fadeIn(1000);
        setTimeout(function() {
          location.reload();
        }, 5000);
      }
    }
  }

  $(document).on("click", "#startButton", function() {
      game = true;
      $("#content").html("")
      .append(gameInfo, answersField);
      $("#gameInfo").append(pokemon, infoDisplay);
      $("#infoDisplay").append(answer, timer, guessesLeft);
      round();
    });

  $(document).on("click", ".options", function() {
    console.log(pokemonList.length);
    if(wait && guesses > 0) {
      stopTimer();
      wait = false;
      if($(this).text() == pokemonName) {
        // CORRECT GUESS
        score++;
        console.log("SCORE: " + score);
        $("#answer").hide().html("It's " + pokemonName).fadeIn(400);
        $(".pokemonPic").addClass("reveal");
        seconds = 10;
        $("#timer").html(seconds);
        setTimeout(round, 1500);
      } else {
        // INCORRECT GUESS
        guesses--;
        if(guesses == 0) {
          // LOSE GAME
          stopTimer();
          $("#guessesLeft").html("Guesses Left: " + guesses);
          $("#content").html("").append(end);
          endMessage.text("Somewhere, Professor Oak is crying. Stick around to restart.");
          scoreDisplay.text("Score: " + score);
          end.append(endMessage, scoreDisplay).hide().fadeIn(1000);
          setTimeout(function() {
            location.reload();
          }, 5000);
        } else {
          // LOSE ROUND
          seconds = 10;
          $("#answer").hide().html("Incorrect!").fadeIn(400);
          $("#timer").html(seconds);
          $("#guessesLeft").html("Guesses Left: " + guesses);
          stopTimer();
          setTimeout(round, 1000);
        }
      }
    }
  });

  function timeKeeper() {
    seconds--;
    $("#timer").html(seconds);
    if(seconds === 0) {
      stopTimer();
      $("#answer").hide().html("Time's Up!").fadeIn(1200);
      guesses--;
      seconds = 10;
      $("#timer").html(seconds);
      $("#guessesLeft").html("Guesses Left: " + guesses);
      if(guesses === 0) {
        // GAME OVER SCENE
        game = false;
        $("#guessesLeft").html("Guesses Left: " + guesses);
        $("#content").html("").append(end);
        endMessage.text("Somewhere, Professor Oak is crying. Resetting in 5 seconds.");
        scoreDisplay.text("Score: " + score);
        end.append(endMessage, scoreDisplay).hide().fadeIn(1000);
        setTimeout(function() {
          location.reload();
        }, 5000);
      } else {
        stopTimer();
        setTimeout(round, 2000);
      }
    }
  }

  function stopTimer() {
    clearInterval(time);
  }

  function getPokemon() {
    console.log("getPokemon Called");
    pokemonName = undefined;
    pokemonPicture = undefined;
    while(pokemonName == undefined) {
      console.log("STUCK IN LOOP?");
      let picker = Math.floor(Math.random() * pokemonList.length);
      if(pickedPokemon.indexOf(pokemonList[picker].name) == -1) {
        pickedPokemon.push(pokemonList[picker].name);
        pokemonPicture = pokemonList[picker].image;
        pokemonName = pokemonList[picker].name;
      }
    }
    $("#answer").html("?");
    $("#guessesLeft").html("Guesses Left: " + guesses);
    $("#pokemon").html(pokemonPicture);
    $(".pokemonPic").hide().fadeIn(1000);
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
