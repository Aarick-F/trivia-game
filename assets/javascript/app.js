$(document).ready(() => {

  // GAME SCENE DIVS =======================================
  // =======================================================
  const gameInfo = $("<div id='gameInfo'></div>");
  const pokemon = $("<div id='pokemon'></div>");
  const infoDisplay = $("<div id='infoDisplay'></div>");
  const answer = $("<div id='answer' class='info'></div>");
  const timer = $("<div id='timer' class='info'>10</div>");
  const guessesLeft = $("<div id='guessesLeft'></div>");
  const answersField = $("<div id='answersField'></div>");
  // BEGINNING SCENE
  const beginning = $("#content").html();
  // =======================================================

  let game,
      guesses,
      score,
      seconds,
      pickedPokemon,
      pokemonPicture,
      pokemonName;

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
    pickedPokemon = [];
    pokemonName = undefined;
    pokemonPicture = undefined;

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
      getPokemon();
      seconds = 10;
      const timer = setInterval(function() {
        seconds--;
        $("#timer").html(seconds);
        console.log(seconds);
        if(seconds === 0) {
          clearInterval(timer);
          $("#answer").hide().html("It's " + pokemonName).fadeIn(1500);
          $(".pokemonPic").addClass("reveal");
          guesses--;
          $("#guessesLeft").html(guesses);
          if(guesses === 0) {
            // GAME OVER SCENE
          } else {
            setTimeout(round, 3000);
            // ROUND RESTART
          }
        }
      }, 1000);
      $("#answer").html("?");
      $("#guessesLeft").html(guesses);
      $("#pokemon").html(pokemonPicture);
      $(".pokemonPic").hide().fadeIn(2000);

      $("#pokemon").on("click", function() {
        $(".pokemonPic").addClass("reveal");
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
    console.log(pokemonName);  
  }

});
