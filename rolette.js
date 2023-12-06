function initiate(){
	console.log("Initiating !")
	console.log( Math.floor((Math.random() * 36) + 1));	
	$("#result").val(46434)
}

$("#startbtn").on("click", function() {
  console.log("Handler for `click` called.");
  $("#result").val(Math.round( Math.random() * 35 +1 ))

  
} );


function first_bet(){
	
}



$( document ).ready(function() {
	game_num = 0;	
    console.log( "ready!" );
    console.log( "Game number", game_num);
    initiate();

//    console.log( Math.round( Math.random() * 35 +1 ));


    
});