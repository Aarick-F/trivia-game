$(document).ready(() => {

  const gameInfo = $("<div id='gameInfo'></div>");
  const pokemon = $("<div id='pokemon'></div>");
  const infoDisplay = $("<div id='infoDisplay'></div>");
  const answer = $("<div id='answer' class='info'></div>");
  const timer = $("<div id='timer' class='info'></div>");
  const guessesLeft = $("<div id='guessesLeft'></div>");
  const answersField = $("<div id='answersField'></div>")

  $("#startButton").on("click", function() {
    $("#content").html("");
    $("#content").append(gameInfo);
    $("#gameInfo").append(pokemon, infoDisplay);
    $("#infoDisplay").append(answer, timer, guessesLeft);
    $("#content").append(answersField);
  });

});
