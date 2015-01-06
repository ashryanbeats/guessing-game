// create the answer
var answer = Math.floor(Math.random()*100 + 1);
$("#answer").text(answer);

// save the user answers
var userAnswer = [];
var guessLimit = 8;
$("#guess-submit").click(function() {
	if (!isNaN($("#guess-input").val())) { // if it's a number
		userAnswer.push($("#guess-input").val()); // push to the userAnswer array
		guessLimit--; // subtract from the guess limit	
		$("#guess-input").val("");
	}
	$("#userAnswer").text(userAnswer);
});


/* works
$("#guess-input").keyup(function(event) {
	var userAnswer = $("#guess-input").val();	
	$("#userAnswer").text(userAnswer);
});*/





//get the user's answer
/*$("#guess-submit").submit(function() {
	var userAnswer = $("#guess-input").val();
	$("#userAnswer").text(userAnswer);
});*/

//compare the answers

// if the answer is within 15, warm, else cold
