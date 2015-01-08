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
		if (userAnswer.length === 1) {
			if (userAnswer[0] === answer) {
				$("#" + (guessLimit + 1)).addClass("win").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Win!");
			}
			else if (ultDiff < 25) {
				$("#winLose").text("Warm");
				
				//##<br/>is Warm
				$("#" + (guessLimit + 1)).addClass("warm").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Warm");
			}
			else {
				$("#winLose").text("Cold");
				//##<br/>is Cold
				$("#" + (guessLimit + 1)).addClass("cold").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Cold");
			}
		}
		else if (userAnswerUlt === answer) {
			$("#winLose").text("Win");
			//##<br/>is Win!
			$("#" + (guessLimit + 1)).addClass("win").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Win!");
		}
		else if (ultDiff < penultDiff) {
			$("#winLose").text("Warmer");
			//##<br/>is Warmer
			$("#" + (guessLimit + 1)).addClass("warm").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Warmer");
		}
		else if (ultDiff === penultDiff) {
			$("#winLose").text("Same");
			//##<br/>is Same
			$("#" + (guessLimit + 1)).addClass("same").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Same");
		}
		else {
			$("#winLose").text("Colder");
			//##<br/>is Colder
			$("#" + (guessLimit + 1)).addClass("cold").removeClass("guess").html(userAnswerUlt + "<br/>" + "is Colder");
		}
	}
	if (userAnswer.length === 8) {
		$("#winLose").text("Lose"); 
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
		$("#" + i).removeClass("warm cold win same").addClass("guess").html("Guess" + "<br/>" + "#" + cardNumber);
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
	$(".display-answer").text(answer);
	
	//DEBUG
	$("#winLose").text("Lose");
	$("#userAnswer").text(answer);
});
