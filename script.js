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
var winTitle = "Nice win!";
var winMessage = "The answer was " + answer + ". You're a great guesser!";
var loseTitle = "Oh no, you lost..."
var loseMessage = "That's too bad. The number you were looking for was " + answer + ".";
var giveAnswerTitle = "The answer was...";
var giveAnswerMessage = "The answer you were looking for in this round was " + answer + ".";
var restartTitle = "Do you really want to restart?";
var restartMessage = "Your previous guesses will be cleared and the mystery number will be reset to a new number.";
var nevermindButton = '<button type="button" class="btn btn-default" data-dismiss="modal">Nevermind</button>';
var restartButton = '<input class="btn btn-danger restart" type="button" value="Restart" data-dismiss="modal">';
var nevermindButton = '<button type="button" class="btn btn-default" data-dismiss="modal">Nevermind</button>';

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
				winLose("win");
				disable();
			}
			else if (ultDiff < 25) {
				temp("warm", "is Warm");
			}
			else {
				temp("cold", "is Cold");
			}
		}
		// second to seventh cards
		else if (userAnswer.length > 0 && userAnswer.length < 8)
			if (userAnswerUlt === answer) {				
				winLose("win");
				disable();
			}
			else if (ultDiff < penultDiff) {
				temp("warm", "is Warmer");
			}
			else if (ultDiff === penultDiff) {
				temp("same", "is Same");
			}
			else {
				temp("cold", "is Colder");
			}
		// last card
		else if (userAnswer.length === 8) {
			if (userAnswerUlt === answer) {
				winLose("win");
				disable();			
			}
			else {
				winLose("lose");
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


// modals
$("#give-answer").click(function() {
	// messages
	$(".modal-title").text(giveAnswerTitle);
	$(".modal-body").text(giveAnswerMessage);
	
	// buttons
	$("#modal-button-1").html("");
	$("#modal-button-2").html(restartButton);
	$("#modal-button-3").html("");
	
	//DEBUG
	$("#winLose").text("Lose");
	$("#userAnswer").text(answer);
});

$("#restart-button").click(function() {
	// messages
	$(".modal-title").text(restartTitle);
	$(".modal-body").text(restartMessage);
	
	// buttons
	$("#modal-button-1").html(nevermindButton);
	$("#modal-button-2").html(restartButton);
	$("#modal-button-3").html("");
	
	//DEBUG
	$("#winLose").text("Lose");
	$("#userAnswer").text(answer);
});


// focus on the input when cards are clicked 
$("#guesses").click(function() {
	$("#guess-input").focus();
});

// allow user to enter their guess with the return key
$("#submit-area").keyup(function(event) {
	if(event.keyCode === 13) {
		$("#guess-submit").click();
	}
});

var disable = function() {
	$("#guess-input, #guess-submit").attr("disabled", "true");
}

var winLose = function(outcome) {
	// modal buttons
	$("#modal-button-1").html("");
	$("#modal-button-2").html(restartButton);
	$("#modal-button-3").html("");
	
	if (outcome === "win") {
		// sound
		sound.play('winSound');				
		
		// card
		$("#" + (guessLimit + 1)).addClass("win").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Win!");
		
		// modal
		$(".modal-title").text(winTitle);
		$(".modal-body").text(winMessage);
		$('.modal').modal("show");
	}
	else if (outcome === "lose") {
		// sound
		sound.play('loseSound');
		// card
		$("#" + (guessLimit + 1)).addClass("lose").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Lose!");
		
		// modal
		$(".modal-title").text(loseTitle);
		$(".modal-body").text(loseMessage);
		$('.modal').modal("show");
	}
}

var temp = function(status, message) {
	if (status === "warm") {
		sound.play('warmSound');
		$("#" + (guessLimit + 1)).addClass("warm").removeClass("guess").html(userAnswerUlt + "<br/>" + message);
	}
	else if (status === "cold") {
		sound.play('coldSound');
		$("#" + (guessLimit + 1)).addClass("cold").removeClass("guess").html(userAnswerUlt + "<br/>" + message);
	}
	else if (status === "same") {
		sound.play("sameSound");
		$("#" + (guessLimit + 1)).addClass("same").removeClass("guess").html(userAnswerUlt + "<br/>" + message);	
	}
}
