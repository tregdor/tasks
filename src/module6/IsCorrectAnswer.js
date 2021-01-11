function IsCorrectAnswer(correctAnswer) {
  this.correctAnswer = correctAnswer;
}

IsCorrectAnswer.prototype.checkCorrectAnswer = function (answer) {
  if (answer < this.correctAnswer) {
    console.log("your answer is less than necessary");
    return false;
  } if (answer > this.correctAnswer) {
    console.log("your answer is more than necessary");
    return false;
  }
  console.log("You win!!!");
  return true;
};

module.exports = {
  IsCorrectAnswer,
};
