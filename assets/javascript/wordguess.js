//initialize game
var wins = 0;
var losses = 0;
var userGuess, guess, guessesLeft

init();

// pressing a key starts the game
document.onkeyup = function playGame() {

    //the pressed key = guess: is stored in variable, pushed into array 
    guess = event.key;
    userGuess.push(guess);
    
    //the array is published to page
    for (var i = 1; i < 9; i++) {

        document.getElementById("userinput").innerHTML = userGuess;
    }
    
    //computer generates random # 0-25; number gets converted to string a-z
    var randomNumber = Math.floor(Math.random() * 25);
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var randomLetter = alphabet.charAt(randomNumber);

   //if guesses > 0, & the user gets it right the guesses reset to 9 and wins increase
   //if guesses > 0, & the user gets it wrong the # of guesses remaining go down 1
   //if guesses go down to 0, losses go up 1 and guesses reset to 9
    if (guess === randomLetter && guessesLeft > 1) {
        wins++;
        init();
    } else if  (userGuess !== randomLetter && guessesLeft > 1) {
        guessesLeft--;
    } else if (guessesLeft === 1) {
        losses++;
        init();
    } 

    document.getElementById('win').textContent = wins;
    document.getElementById('loss').textContent = losses;
    document.getElementById('guesses-left').textContent = guessesLeft;
    
     
    //guesses reset
    // guesses left resets
    //wins and losses do NOT reset


    console.log('computers random letter: ' + randomLetter);
    console.log('the user guesses: ' + guess);
    
}

function init() {
    guessesLeft = 9;
    userGuess = [];
    guess;
};
