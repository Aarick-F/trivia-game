$(document).ready(() => {

  // GAME SCENE DIVS =======================================
  // =======================================================
  const gameInfo = $("<div id='gameInfo'></div>");
  const pokemon = $("<div id='pokemon'></div>");
  const infoDisplay = $("<div id='infoDisplay'></div>");
  const answer = $("<div id='answer' class='info'></div>");
  const timer = $("<div id='timer' class='info'></div>");
  const guessesLeft = $("<div id='guessesLeft'></div>");
  const answersField = $("<div id='answersField'></div>");
  // BEGINNING SCENE
  const beginning = $("#content").html();
  // =======================================================

  let game,
      wrongGuesses,
      score,
      seconds,
      pickedPokemon;

  // APP START
  // =========
  init();
  // =========

  function init() {
    $("#content").html(beginning)
    .hide()
    .fadeIn(1500);
    wrongGuesses = 0;
    game = false;
    score = 0;
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
      seconds = 10;
      const timer = setInterval(function() {
        seconds--;
        console.log(seconds);
        if(seconds === 0) {
          clearInterval(timer);
          wrongGuesses++;
          if(wrongGuesses === 3) {
            // GAME OVER SCENE
          } else {
            // ROUND RESTART
          }
        }
      }, 1000);
      
      $("#pokemon").on("click", function() {
        clearInterval(timer);
        init();
      });
    }
  }

});
