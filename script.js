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
		$("#warning").text("Numbers please!");
		$("#guess-input").val(""); // reset the input field
	}
	else if ($("#guess-input").val() < 1 || $("#guess-input").val() > 100) {
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
		
		// Winning and Losing
		if (userAnswer.length === 1) {
			if (ultDiff < 25) {
				$("#winLose").text("Warm");
			}
			else {
				$("#winLose").text("Cold");
			}
		}
		else if (userAnswer.length === 8) {
			$("#winLose").text("Lose");
		}
		else if (userAnswerUlt === answer) {
			$("#winLose").text("Win");
		}
		else if (ultDiff < penultDiff) {
			$("#winLose").text("Warmer");
		}
		else if (ultDiff === penultDiff) {
			$("#winLose").text("Same");
		}
		else {
			$("#winLose").text("Colder");
		}
	}
});
