const history = [];
var initialInput = 0;
var baseBetvalue = 0;
var increseRate = 0;
var minChip = 0;
var ballance = 0;
var minBet = 0;

var newChoice = 0;
var lastChoice = 0;


//*****************************************************************
// Initiate the game
function initiate(){
	console.log("Initiating !")

  $("#result").val()
}

//*****************************************************************
// Click on NEXT Button
$("#nextbtn").on("click", function() {
  lastChoice = newChoice
  newChoice = rolle()

	lastResult = $("#result").val()

  if(isNaN(parseFloat(lastResult)))
  {
    return null
  }
  if(parseFloat(lastResult) <1 || parseFloat(lastResult) > 36)
  {
    return null
  }

  if(0<= lastResult && lastResult <= 36 && lastResult != '')
  {
    console.log("Next Game!")
    history.unshift(getResult())


    next_bet();

  }
  $('#history').text(history.slice(0,5));
  $("#result").val('')

});

//*****************************************************************
// Get Result string
function getResult(){
  resultString = 'Rolle = ' + lastResult + ', Choice = ' + lastChoice
  console.log("lastResult from func",lastResult)
  console.log("lastChoice from func",lastChoice)
  // First half
  if(is_first_half(lastChoice) && is_first_half(lastResult)) 
    resultString += 'W '; 
  else if (is_first_half(lastChoice) && !is_first_half(lastResult))
    resultString +='L '
  else resultString +='- '

  // First half
  if(is_first_half(lastChoice) && is_first_half(lastResult)) 
    resultString += 'W '; 
  else if (is_first_half(lastChoice) && !is_first_half(lastResult))
    resultString +='L '
  else resultString +='- '

  // First half
  if(is_first_half(lastChoice) && is_first_half(lastResult)) 
    resultString += 'W '; 
  else if (is_first_half(lastChoice) && !is_first_half(lastResult))
    resultString +='L '
  else resultString +='- '

  // First half
  if(is_first_half(lastChoice) && is_first_half(lastResult)) 
    resultString += 'W '; 
  else if (is_first_half(lastChoice) && !is_first_half(lastResult))
    resultString +='L '
  else resultString +='- '

  // First half
  if(is_first_half(lastChoice) && is_first_half(lastResult)) 
    resultString += 'W '; 
  else if (is_first_half(lastChoice) && !is_first_half(lastResult))
    resultString +='L '
  else resultString +='- '

  // Second half
  if(is_second_half(lastChoice) && is_second_half(lastResult)) 
    resultString += 'W '; 
  else if (is_second_half(lastChoice) && !is_second_half(lastResult))
    resultString +='L '
  else resultString +='- '



  console.log("resultString = ",resultString)
  return resultString+'\n'



}
//*****************************************************************
// Click on START Button
$("#startbtn").on("click", function() {
  newChoice = rolle()


  initialInput = $("#initialInput").val();
  baseBetvalue = $("#baseBet").val();
  increseRate = $("#increseRate").val();
  minChip = $("#minChip").val();
  ballance = initialInput

  /*
  if(next_choice){
    $("#firstHalf > div").text(2*baseBetvalue)

    history.push([baseBetvalue,'e','w','l'])
    console.log(history)
  }
  */

  $("#row45").attr("hidden", true);
  $("#initialInput").attr("disabled", true);
  $("#baseBet").attr("disabled", true);
  $("#increseRate").attr("disabled", true);
  $("#minChip").attr("disabled", true);
  $("#row8").attr("hidden", false);

  first_bet()
  
} );

//*****************************************************************
// Fill out first bets
function first_bet(){
  minBet = Math.round(Math.max(ballance*baseBetvalue/300 , minChip),0);
	$("#result").val()
  
  $("#firstHalf > div").text(minBet*is_first_half(newChoice))
  $("#secondHalf > div").text(minBet* is_second_half(newChoice))

  $("#evenNumbers > div").text(minBet*is_even(newChoice))
  $("#oddNumbers > div").text(minBet* is_odd(newChoice))

  $("#redNumbers > div").text(minBet*is_red(newChoice))
  $("#blackNumbers > div").text(minBet* is_black(newChoice))

  setBetBGColors()
  console.log("newChoice =",newChoice); 
  return newChoice

}
//*****************************************************************
// Fill out first bets
function next_bet(){
  minBet = Math.round(Math.max(ballance*baseBetvalue/300 , minChip),0);
	$("#result").val()
  
  $("#firstHalf > div").text(minBet*is_first_half(newChoice))
  $("#secondHalf > div").text(minBet* is_second_half(newChoice))

  $("#evenNumbers > div").text(minBet*is_even(newChoice))
  $("#oddNumbers > div").text(minBet* is_odd(newChoice))

  $("#redNumbers > div").text(minBet*is_red(newChoice))
  $("#blackNumbers > div").text(minBet* is_black(newChoice))

  setBetBGColors()
  console.log("newChoice =",newChoice); 
  return newChoice

}

//*****************************************************************
// Rolle a new number
function setBetBGColors(){
  console.log("newChoice in setBG=",newChoice)
  if(is_first_half(newChoice)){
    $("#firstHalf > div").addClass("selected");
    $("#firstHalf > div").removeClass("unselected");
    $("#secondHalf > div").addClass("unselected");
    $("#secondHalf > div").removeClass("selected");
  }
  if(is_second_half(newChoice)){
    $("#firstHalf > div").addClass("unselected");
    $("#firstHalf > div").removeClass("selected");
    $("#secondHalf > div").addClass("selected");
    $("#secondHalf > div").removeClass("unselected");
  }
  if(is_red(newChoice)){
    $("#redNumbers > div").addClass("selected");
    $("#redNumbers > div").removeClass("unselected");
    $("#blackNumbers > div").addClass("unselected");
    $("#blackNumbers > div").removeClass("selected");
  }
  if(is_black(newChoice)){
    $("#redNumbers > div").addClass("unselected");
    $("#redNumbers > div").removeClass("selected");
    $("#blackNumbers > div").addClass("selected");
    $("#blackNumbers > div").removeClass("unselected");
  }
  if(is_even(newChoice)){
    $("#evenNumbers > div").addClass("selected");
    $("#evenNumbers > div").removeClass("unselected");
    $("#oddNumbers > div").addClass("unselected");
    $("#oddNumbers > div").removeClass("selected");
  }
  if(is_odd(newChoice)){
    $("#evenNumbers > div").addClass("unselected");
    $("#evenNumbers > div").removeClass("selected");
    $("#oddNumbers > div").addClass("selected");
    $("#oddNumbers > div").removeClass("unselected");
  }




}

//*****************************************************************
// Rolle a new number
function rolle(){
  return Math.round( Math.random() * 35 +1);
}
//*****************************************************************
// On Load

$( document ).ready(function() {
	game_num = 0;	
    console.log( "ready!" );
    console.log( "Game number", game_num);
    initiate();
    
});


//*****************************************************************
function is_first_half(value){
  return value < 19
}
function is_second_half(value){
  return value >= 19
}

function is_red(value){
  return [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(value)
}
function is_black(value){
  return [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35].includes(value)
}

function is_odd(value){
  return value % 2 == 1
}
function is_even(value){
  return value % 2 == 0
}
function next_choice(){
  return (Math.round( Math.random() * 100 +1 ) % 2) == 1
}