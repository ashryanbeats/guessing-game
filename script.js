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
    warmSound: [0, 600],
    coldSound: [875, 750],
    winSound: [1918, 2500],
    sameSound: [4518, 500],
    loseSound: [6093, 1700]
  }
});

$("#guess-submit").click(function() {
	// Getting the input
	if (isNaN($("#guess-input").val())) { // if not a number
		// DEBUG
		$("#warning").text("Numbers please!");
		$("#guess-input").val(""); // reset the input field
	}
	else if ($("#guess-input").val() < 1 || $("#guess-input").val() > 100) { // if out of range
		// DEBUG
		$("#warning").text("Between 1 and 100 please!!");
		$("#guess-input").val(""); // reset the input field
	}
	else if (!isNaN($("#guess-input").val())) { // if it's a number
		$("#warning").text(""); // reset warnings
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
				
				$(".display-answer").text(answer);
				$('.win-modal-sm').modal("show");
			}
			else if (ultDiff < 25) {
				$("#winLose").text("Warm");
				
				//##<br/>is Warm
				sound.play('warmSound');
				$("#" + (guessLimit + 1)).addClass("warm").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Warm");
			}
			else {
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
				
				$(".display-answer").text(answer);
				$('.win-modal-sm').modal("show");
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
		else if (userAnswer.length === 8) {
			if (userAnswerUlt === answer) {
				$("#winLose").text("Win");
				//##<br/>is Win!
				sound.play('winSound');
				$("#" + (guessLimit + 1)).addClass("win").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Win!");
				
				$(".display-answer").text("The answer was " + answer + ". You're a great guesser!");
				$('.win-modal-sm').modal("show");				
			}
			else {
				$("#winLose").text("Lose"); 
				
				sound.play('loseSound');
				$("#" + (guessLimit + 1)).addClass("lose").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Lose!");
		
				$(".display-answer").text("That's too bad. The number you were looking for was " + answer + ".");
				$('.lose-modal-sm').modal("show");				
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
	
	// reset cards
	var cardNumber = 1;
	for (var i = guessLimit; i > 0; i--) {
		$("#" + i).removeClass("warm cold win same lose").addClass("guess").html("Guess" + "<br/>" + "#" + cardNumber);
		cardNumber++;
	}
	
	// DEBUG
	$("#answer").text(answer);
	$("#userAnswerLast").text("Last: " + userAnswerUlt);	
	$("#userAnswer").text(userAnswer);
	$("#winLose").text("Restarted");
	$("#warning").text(""); // reset warnings
});

$("#give-answer").click(function() {
	$(".display-answer").text("The answer you were looking for in this round was " + answer + ".");
	
	//DEBUG
	$("#winLose").text("Lose");
	$("#userAnswer").text(answer);
});
