
// DOM interaction variables
var winsText = document.getElementById("wins-text");
var currentWordText = document.getElementById("currentword-text");
var guessesLeftText = document.getElementById("guessesleft-text");
var lettersGuessedText = document.getElementById("lettersguessed-text");
var answerText = document.getElementById("answer-text");
var pokePic = document.getElementById("poke-pic");
var themeOn = document.getElementById("theme-mp3");
var whosThat = document.getElementById("whos-that");
var badEnd = document.getElementById("bad-end");
var start = document.getElementById("start-btn");
var bgCircle = document.getElementById("bg-circle");

// Declare variables to initialize
var currentWord, guessesLeft, lettersGuessed
var wins = 0;

// Objects that store info for each possible word
var pikachu = {
    answer: "pikachu",
    spelling: ["p", "i", "k", "a", "c", "h", "u"]
};

var squirtle = {
    answer: "squirtle",
    spelling: ["s", "q", "u", "i", "r", "t", "l", "e"]
};

var clefairy = {
    answer: "clefairy",
    spelling: ["c", "l", "e", "f", "a", "i", "r", "y"]
};

var togepi = {
    answer: "togepi",
    spelling: ["t", "o", "g", "e", "p", "i"]
};

var horsea = {
    answer: "horsea",
    spelling: ["h", "o", "r", "s", "e", "a"]
};

//Computer picks random word from array
var pokemon = [pikachu, squirtle, clefairy, togepi, horsea];
var word = pokemon[Math.floor(Math.random() * pokemon.length)];

// This function updates dom to place underscores
function updateWord() {
    currentWordText.textContent = currentWord.join(" ");
};

//function to play theme song 
function playTheme() {
    themeOn.play();
};

//function to play 'who's that pokemon?!', theme song, losing music
function startPlay() {
    whosThat.play();
    setTimeout(playTheme, 3000);
};

function pauseMusic() {
    themeOn.pause();
};

function lostGameMusic() {
    badEnd.play();
};

// Buttons to toggle the music on/off
document.getElementById("pause-music-btn").onclick = function pauseMusic() {
    themeOn.pause();
};

document.getElementById("play-music-btn").onclick = function playMusic() {
    themeOn.play();
};

//function updates the text for Wins, Losses and Guesses Left

function updateText() {
    winsText.textContent = "Wins: " + wins;
    guessesLeftText.textContent = "Guesses Left: " + guessesLeft;
    lettersGuessedText.textContent = lettersGuessed;
}

// START GAME when button is pressed

start.onclick = function startGame() {
    startPlay();
    reset();
    reset2();
    updateText();

    bgCircle.style.backgroundColor = "yellow";
    bgCircle.style.borderWidth = "10px";
    start.style.display = "none";
    
};

//Game playing function as keys are pressed

document.onkeyup = function playGame() {

    // sound is selected based on chosen word
    var soundOn = document.getElementById(word.answer + "-mp3");

    //this function stores the command to play audio based on selected pokemon
    function playSound() {
        soundOn.play();
    };

    //Stores keyup event as a guess, converts to lower case
    var userGuess = event.key
    var userGuess = userGuess.toLowerCase();

    //check if userGuess matches any of the letters in the array
    var checkGuess = word.spelling.includes(userGuess);
    var checkLettersGuessed = lettersGuessed.includes(userGuess);

    //check if the arrays of currentWord & word.spelling match (completed word)

    if (checkGuess === true && guessesLeft >= 1) {
        
        //find matching index
        var x = word.spelling.indexOf(userGuess);
        //update the currentWord array with userGuess
        currentWord[x] = userGuess;
        updateWord();
        
        if (JSON.stringify(word.spelling) === JSON.stringify(currentWord)) {
            playSound();
            wins++;
            pokePic.src = 'assets/images/pokemon-' + pokemon.indexOf(word) + '.png';
            answerText.textContent = "It's " + word.answer + "!!";
            reset();
            updateWord();
        }
        
    } else if (checkGuess === false && guessesLeft > 1 && checkLettersGuessed === false) {
        guessesLeft--
        //wrong letter is added to lettersGuessed array
        lettersGuessed.push(userGuess);
     } else if (guessesLeft <= 1) {
        answerText.textContent = "Game Over :( Score: " + wins;
        bgCircle.style.borderWidth = "0px";
        bgCircle.style.backgroundColor = "black";
        pokePic.src = "assets/images/prof-oak-mad.png";
        start.textContent = "Play Again!";
        start.style.display = "block";
        pauseMusic();
        lostGameMusic();
        return;
    }

    updateText();

};

function reset() {
    // Declare variables to initialize
    currentWord = [];
    guessesLeft = 10;
    lettersGuessed = [];
    word = pokemon[Math.floor(Math.random() * pokemon.length)];

    // CURRENT WORD section: generate underscores based on length of word.spelling
    for (i = 0; i < word.spelling.length; i++) {
        currentWord.push("_");
    }

    updateWord();
};

function reset2() {
    pokePic.src = 'assets/images/pokeball.png';
    answerText.textContent = "Who's that pokemon?!";
};
