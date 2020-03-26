
function Game(Steps,Questions,IsCorrectAnswer,common) {
  this.Steps = new Steps();
  this.Questions = new Questions();
  this.IsCorrectAnswer = new IsCorrectAnswer(common.randomInteger(1, 100));

  this.answer = "";

  this.start = async function() {
    let { answer } = this;
    while (this.Steps.checkSteps()) {
      answer = await this.Questions.askQuestion("Enter number: ");
      if (this.IsCorrectAnswer.checkCorrectAnswer(Number(answer))) {
        this.Questions.IO.close();
      }
      this.Steps.addStep();
    }
    this.Questions.IO.close();
  };
}


module.exports = {
  Game,
};
