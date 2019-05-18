var Letter = require("./letter.js");

function Word(answer) {
    this.objectArray = [];
    
    for(var i = 0; i < answer.length; i++ ) {
        var letter = new Letter(answer[i]);
        this.objectArray.push(letter);
    }
    //Log function to display data in the terminal//
    this.log = function() {
        answerLog = "";

        for(var i = 0; i < this.objectArray.length; i++) {
            answerLog += this.objectArray[i] + " ";
        }
        console.log(answerLog) + "\n====================\n";
    };

    this.userGuess = function(input){
        for(var i = 0; i < this.objectArray.length; i++) { 
        this.objectArray[i].guess(input);
        }
    };
}

module.exports = Word;