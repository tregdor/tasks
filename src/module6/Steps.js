
function Steps(maxStep = 5) {
  this.currentSteps = 0;
  this.maxStep = maxStep;
}


Steps.prototype.addStep = function () {
  this.currentSteps += 1;
};

Steps.prototype.checkSteps = function () {
  if (this.currentSteps < this.maxStep) {
    return true;
  }
  console.log("you have exceeded the number of attempts");
  return false;
};

module.exports = {
  Steps,
};
