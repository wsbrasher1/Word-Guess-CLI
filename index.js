
var Word = require("./word.js");
var inquirer = require("inquirer");
//Variable to contain an array of letters that may be entered//
var alphaArray = "abcdefghijklmnopqrstuvwxyz";
//Variable containing an array of words that the app may choose from for the game//
var Cars = [
    "alpha romeo",
    "audi",
    "bentley",
    "bmw",
    "bugatti",
    "cadillac",
    "chevrolet",
    "dodge",
    "delorean",
    "ferrari",
    "fiat",
    "ford",
    "general motors",
    "honda",
    "hyundai",
    "isuzu",
    "jaguar",
    "jeep",
    "kia",
    "lamborghini",
    "lexus",
    "maserati",
    "mercedes benz",
    "nissan",
    "oldsmobile",
    "pontiac",
    "porsche",
    "rover",
    "saab",
    "tesla",
    "triumph",
    "volkswagen"
];

//To create a random index from Cars array//

var randomIndex = Math.floor(Math.random() * Cars.length);
var randomWord = Cars[randomIndex];
//To pass random word through the Word constructor//
var genWord = new Word(randomWord);

var requireNewWord = false;
var incorrectLetters = [];
var correctLetters = [];
var guessesRemaining = 10;

function wordLogic() {
  if(requireNewWord){
    var randomIndex = Math.floor(Math.random() * Cars.length);
    var randomWord = Cars[randomIndex];

    genWord = new Word(randomWord);

    requireNewWord = false;
  }
//Tests to see if the letter guessed is correct//
var completeWord = [];
genWord.objectArray.forEach(completeCheck);

//Letters that are remaining to be guessed//
if(completeWord.includes(false)) {
    inquirer.prompt([
        {
            type: "input",
            message: "Choose a letter from A to Z",
            name: "userinput"
        }
    ]).then(function(input){
        if(!alphaArray.includes(input.userinput) || input.userinput.length > 1) {
            console.log("\nTry again!\n");
            wordLogic();
        }else {
            if(
                incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === ""
            ) {
                console.log("\nAlready guessed or nothing entered\n");
                wordLogic();
            }else {
            //Checks to see if guess is correct//
                var wordCheckArr = [];

                genWord.userGuess(input.userinput);

                genWord.objectArray.forEach(wordCheck);

                if(wordCheckArr.join("")=== completeWord.join("")){
                    console.log("\nWrong!\n");

                    incorrectLetters.push(input.userinput);
                    guessesRemaining--;
                }else {
                    console.log("\nCorrect!\n");

                    correctLetters.push(input.userinput);
                }
                genWord.log();
            //To log the remaining guesses//
                    console.log("Guesses left: " + guessesRemaining + "\n");
            //To print the letters guessed already//
                    console.log("Letters guessed: " + incorrectLetters.join(" ") + "\n");

                    if(guessesRemaining > 0){
                        wordLogic();
                    }else {
                        console.log("Game over!\n");
                        restartGame();
                    }
                    function wordCheck(key) {
                       wordCheckArr.push(key.guessed); 
                    }
                }
            }
        }); 

    }else {
        console.log("You're a winner!\n");
        restartGame();
    }

function completeCheck(key) {
    completeWord.push(key.guessed);
    }
}

function restartGame() {
    inquirer.prompt ([
        {
            type: "list",
            message: "Do you want to: ",
            choices: ["Play again", "Exit game"],
            name: "restart"
        }
    ]).then(function(input){
        if(input.restart === "Play again") {
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesRemaining = 10;
            wordLogic();
        }else {
            return;
        }
    });
}
wordLogic();