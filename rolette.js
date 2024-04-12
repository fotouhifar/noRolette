const history = [];
var initialInput = 0;
var baseBetvalue = 0;
var increseRate = 0;
var minChip = 0;
var ballance = 0;
var minBet = 0;

var keys=['firstHalf','even','red','black','odd','secondHalf']


var lastBets={
  firstHalf: 0,
  secondHalf: 0,
  even: 0,
  odd: 0,
  red: 0,
  black: 0
}
var betAmount={
  firstOrSecond : 0,
  oddOrEven : 0,
  redOrBlack : 0
}
var newBets={
  firstHalf: 0,
  secondHalf: 0,
  even: 0,
  odd: 0,
  red: 0,
  black: 0
}
var lastOutcome={
  firstHalf: '-',
  secondHalf: '-',
  even: '-',
  odd: '-',
  red: '-',
  black: '-'
}
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

	lastResult = parseInt($("#result").val())

  if(isNaN(parseFloat(lastResult)))
  {
    return null
  }
  if(parseFloat(lastResult) <0 || parseFloat(lastResult) > 36)
  {
    return null
  }

  if(0<= lastResult && lastResult <= 36 && lastResult != '')
  {
    history.unshift(getResult())
    //To update amounts, minbet, etc.
    updateBettingValues();

    console.log("Next Game!")


    next_bet();

  }
  $('#history').text(history.slice(0,5));
  $("#result").val('')

});
//*****************************************************************
// Get Result string
function updateBettingValues(){
  
  //initialInput = 0;
  //baseBetvalue = 0;
  //increseRate = 0;
  //minChip = 0;

  console.log("lastResult= ",lastResult)
  console.log("ballance= ",ballance)
  console.log("betAmount= ",betAmount)

  if(lastResult.firstHalf == 'W')
    ballance += lastBets.firstHalf

  else if(lastResult.firstHalf == 'L')
    ballance -= lastBets.firstHalf

  minBet = 0;


}
//*****************************************************************
// Get Result string
function getResult(){
  resultString = 'Rolle = ' + lastResult + ', Choice = ' + lastChoice

  // First half
  if(is_first_half(lastChoice) && is_first_half(lastResult)) 
    lastOutcome.firstHalf= 'W'
  else if (is_first_half(lastChoice) && !is_first_half(lastResult))
    lastOutcome.firstHalf= 'L'
  else lastOutcome.firstHalf= '-'

  // Even
  if(is_even(lastChoice) && is_even(lastResult)) 
    lastOutcome.even= 'W'; 
  else if (is_even(lastChoice) && !is_even(lastResult))
    lastOutcome.even= 'L'
  else lastOutcome.even= '-'

  // Red
  if(is_red(lastChoice) && is_red(lastResult)) 
    lastOutcome.red= 'W'; 
  else if (is_red(lastChoice) && !is_red(lastResult))
    lastOutcome.red= 'L'
  else lastOutcome.red= '-'

  // Black
  if(is_black(lastChoice) && is_black(lastResult)) 
    lastOutcome.black= 'W'; 
  else if (is_black(lastChoice) && !is_black(lastResult))
  lastOutcome.black= 'L'
  else lastOutcome.black= '-'

  // Odd
  if(is_odd(lastChoice) && is_odd(lastResult)) 
    lastOutcome.odd= 'W'; 
  else if (is_odd(lastChoice) && !is_odd(lastResult))
    lastOutcome.odd= 'L'
  else lastOutcome.odd= '-'

  // Second half
  if(is_second_half(lastChoice) && is_second_half(lastResult)) 
    lastOutcome.secondHalf= 'W'; 
  else if (is_second_half(lastChoice) && !is_second_half(lastResult))
    lastOutcome.secondHalf= 'L'
  else lastOutcome.secondHalf= '-'

  resultString +=', Result= '

  for (var i=0 ; i<6; i++)
    resultString += lastOutcome[keys[i]]
 
  console.log("resultString = ",resultString)
  return resultString+'\n'



}
//*****************************************************************
// Click on START Button
$("#startbtn").on("click", function() {
  newChoice = rolle()


  initialInput = parseInt($("#initialInput").val());
  baseBetvalue = parseInt($("#baseBet").val());
  increseRate = 100 + parseInt($("#increseRate").val());
  minChip = parseInt($("#minChip").val());
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
  betAmount.firstOrSecond = minBet
  betAmount.oddOrEven = minBet
  betAmount.redOrBlack = minBet



  setBetValues()
}
//*****************************************************************
// Fill out next bets based on previous bet and results
function next_bet(){
  lastBets= newBets

  newChoice = rolle()

  minBet = Math.round(Math.max(ballance*baseBetvalue/300 , minChip),0);
  
  if(lastResult.firstHalf == 'L' || lastResult.secondHalf=='L')
    betAmount.firstOrSecond *= increseRate
  else
    betAmount.firstOrSecond = minBet

  if(lastResult.redOrBlack == 'L' || lastResult.redOrBlack=='L')
    betAmount.redOrBlack *= increseRate
  else
    betAmount.redOrBlack = minBet

    if(lastResult.oddOrEven == 'L' || lastResult.oddOrEven=='L')
    betAmount.oddOrEven *= increseRate
  else
    betAmount.oddOrEven = minBet

  setBetValues()

}
//*****************************************************************
// set bet values
function setBetValues(){

  newBets.firstHalf = betAmount.firstOrSecond*is_first_half(newChoice)
  newBets.secondHalf = betAmount.firstOrSecond* is_second_half(newChoice)
  newBets.even = betAmount.oddOrEven*is_even(newChoice)
  newBets.odd = betAmount.oddOrEven* is_odd(newChoice)
  newBets.red = betAmount.redOrBlack*is_red(newChoice)
  newBets.black = betAmount.redOrBlack*is_black(newChoice)

  console.log('ballance = ',ballance)
  for(i=0;i<6;i++){
    console.log(newBets[keys[i]])
    ballance -= parseInt(newBets[keys[i]])
  }

  console.log('ballance = ',ballance)

	$("#result").val()
  
  $("#firstHalf > div").text(newBets.firstHalf)
  $("#secondHalf > div").text(newBets.secondHalf)

  $("#evenNumbers > div").text(newBets.even)
  $("#oddNumbers > div").text(newBets.odd)

  $("#redNumbers > div").text(newBets.red)
  $("#blackNumbers > div").text(newBets.black)

  setBetBGColors()
}

//*****************************************************************
// Rolle a new number
function setBetBGColors(){
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