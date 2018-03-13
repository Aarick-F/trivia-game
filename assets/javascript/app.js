$(document).ready(() => {

  const gameInfo = $("<div id='gameInfo'></div>");
  const pokemon = $("<div id='pokemon'></div>");
  const infoDisplay = $("<div id='infoDisplay'></div>");
  const answer = $("<div id='answer' class='info'></div>");
  const timer = $("<div id='timer' class='info'></div>");
  const guessesLeft = $("<div id='guessesLeft'></div>");
  const answersField = $("<div id='answersField'></div>")

  $("#startButton").on("click", function() {
    $("#content").html("")
    .append(gameInfo, answersField);
    $("#gameInfo").append(pokemon, infoDisplay);
    $("#infoDisplay").append(answer, timer, guessesLeft);
  });

});
