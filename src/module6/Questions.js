const readline = require("readline");

function IO() {
  this.IO = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function Questions() {
  IO.call(this);
  const answers = [];

  this.askQuestion = function(q) {
    return new Promise((res, rej) => {
      this.IO.question(q, (answer) => {
        let nAnswer = parseInt(answer, 10);
        if (this.isNotValidAnswer(nAnswer)) {
          nAnswer = this.askQuestion("Enter correct answer: ");
        }
        answers.push(nAnswer);
        res(nAnswer);
      });
    });
  };
  this.sayAnswers = function() {
    console.log(answers);
  };
  this.isNotValidAnswer = function(answer) {
    return answer > 100 || answer < 0 || Number.isNaN(answer);
  };
}

module.exports = {
  Questions,
};
