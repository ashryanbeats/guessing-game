// create the answer
var answer = Math.floor(Math.random()*100 + 1);
// DEBUG
$("#answer").text(answer);

// save the user answers
var userAnswer = [];
var guessLimit = 8;
var userAnswerUlt = 0;
var userAnswerPenult = 0;
var ultDiff = 0;
var penultDiff = 0;

var sound = new Howl({
  src: ['sounds/game-sounds.ogg', 'sounds/game-sounds.mp3'],
  sprite: {
    warmSound: [0, 750],
    coldSound: [875, 950],
    winSound: [1930, 2500],
    sameSound: [4518, 850],
    loseSound: [6093, 1700]
  }
});

// Messages
var winMessage = "The answer was " + answer + ". You're a great guesser!";
var loseMessage = "That's too bad. The number you were looking for was " + answer + ".";
var giveAnswerTitle = "The answer was...";
var giveAnswerMessage = "The answer you were looking for in this round was " + answer + ".";
var restartTitle = "Do you really want to restart?";
var restartMessage = "Your previous guesses will be cleared and the mystery number will be reset to a new number.";


$("#guess-submit").click(function() {
	// Getting the input
	if ($("#guess-input").val() === "") { // if not a number
		// DEBUG
		$("#warning").text("Numbers please!");
		
		$("#warning-number").addClass("warn-text");
		$("#guess-input").val(""); // reset the input field
	}
	else if ($("#guess-input").val() < 1 || $("#guess-input").val() > 100) { // if out of range
		// DEBUG
		$("#warning").text("Between 1 and 100 please!!");
		
		$("#warning-scope").addClass("warn-text");
		$("#guess-input").val(""); // reset the input field
	}
	else if (!isNaN($("#guess-input").val())) { // if it's a number
		// reset warnings
		$("#warning").text("");
		$("#warning-number").removeClass("warn-text");
		$("#warning-scope").removeClass("warn-text");
		userAnswer.push(+$("#guess-input").val()); // push input to the userAnswer array. + converts the input to a number.
		
		// set variables
		userAnswerUlt = userAnswer[userAnswer.length - 1];
		userAnswerPenult = userAnswer[userAnswer.length - 2];
		// get the difference for comparison. Math.abs ensures a positive number.
		ultDiff = Math.abs(userAnswerUlt - answer);
		penultDiff = Math.abs(userAnswerPenult - answer);
		
		guessLimit--; // subtract from the guess limit
		$("#guess-input").val(""); // reset the input field
		
		// DEBUG
		$("#userAnswerLast").text("Last: " + userAnswerUlt);	
		$("#userAnswer").text(userAnswer);
		
		// Temperature and Win
		// first card
		if (userAnswer.length === 1) {
			if (userAnswer[0] === answer) {
				sound.play('winSound');
				$("#" + (guessLimit + 1)).addClass("win").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Win!");
				
				$(".display-answer").text(winMessage);
				$('.win-modal-sm').modal("show");
				disable();
			}
			else if (ultDiff < 25) {
				//DEBUG
				$("#winLose").text("Warm");
				
				//##<br/>is Warm
				sound.play('warmSound');
				$("#" + (guessLimit + 1)).addClass("warm").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Warm");
			}
			else {
				//DEBUG
				$("#winLose").text("Cold");
				
				//##<br/>is Cold
				sound.play('coldSound');
				$("#" + (guessLimit + 1)).addClass("cold").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Cold");
			}
		}
		// second to seventh cards
		else if (userAnswer.length > 0 && userAnswer.length < 8)
			if (userAnswerUlt === answer) {
				$("#winLose").text("Win");
				//##<br/>is Win!
				sound.play('winSound');
				$("#" + (guessLimit + 1)).addClass("win").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Win!");
				
				$(".display-answer").text(winMessage);
				$('.win-modal-sm').modal("show");
				disable();
			}
			else if (ultDiff < penultDiff) {
				$("#winLose").text("Warmer");
				//##<br/>is Warmer
				sound.play('warmSound');
				$("#" + (guessLimit + 1)).addClass("warm").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Warmer");
			}
			else if (ultDiff === penultDiff) {
				$("#winLose").text("Same");
				//##<br/>is Same
				sound.play("sameSound");
				$("#" + (guessLimit + 1)).addClass("same").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Same");
			}
			else {
				$("#winLose").text("Colder");
				//##<br/>is Colder
				sound.play('coldSound');
				$("#" + (guessLimit + 1)).addClass("cold").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Colder");
			}
		// last card
		else if (userAnswer.length === 8) {
			if (userAnswerUlt === answer) {
				$("#winLose").text("Win");
				//##<br/>is Win!
				sound.play('winSound');
				$("#" + (guessLimit + 1)).addClass("win").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Win!");
				
				$(".display-answer").text(winMessage);
				$('.win-modal-sm').modal("show");	
				disable();			
			}
			else {
				$("#winLose").text("Lose"); 
				
				sound.play('loseSound');
				$("#" + (guessLimit + 1)).addClass("lose").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Lose!");
		
				$(".display-answer").text(loseMessage);
				$('.lose-modal-sm').modal("show");
				disable();				
			}
		}
	}
});

$(".restart").click(function() {
	// reset variables
	answer = Math.floor(Math.random()*100 + 1);
	userAnswer = [];
	guessLimit = 8;
	userAnswerUlt = 0;
	userAnswerPenult = 0;
	ultDiff = 0;
	penultDiff = 0;
	
	// reset UI
	$("#guess-input").val(""); // reset the input field
	$("#guess-input, #guess-submit").removeAttr("disabled");
	
	// reset cards
	var cardNumber = 1;
	for (var i = guessLimit; i > 0; i--) {
		$("#" + i).removeClass("warm cold win same lose").addClass("guess").html("Guess" + "<br/>" + "#" + cardNumber);
		cardNumber++;
	}
	
	// reset warnings
	$("#warning-number").removeClass("warn-text");
	$("#warning-scope").removeClass("warn-text");
	
	// DEBUG
	$("#answer").text(answer);
	$("#userAnswerLast").text("Last: " + userAnswerUlt);	
	$("#userAnswer").text(userAnswer);
	$("#winLose").text("Restarted");
	$("#warning").text("");
});


// messaging for restart buttons
$("#give-answer").click(function() {
	$(".modal-title").text(giveAnswerTitle);
	$(".modal-body").text(giveAnswerMessage);
	
	//DEBUG
	$("#winLose").text("Lose");
	$("#userAnswer").text(answer);
});

$("#restart-button").click(function() {
	$(".modal-title").text(restartTitle);
	$(".modal-body").text(restartMessage);
	
	//DEBUG
	$("#winLose").text("Lose");
	$("#userAnswer").text(answer);
});


// focus on the input when cards are clicked 
$("#guesses").click(function() {
	$("#guess-input").focus();
});

var disable = function() {
	$("#guess-input, #guess-submit").attr("disabled", "true");
}
