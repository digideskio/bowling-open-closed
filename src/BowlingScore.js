var _ = require('lodash')

function BowlingScore() {

}

function sum(a, b) {
    return a + b
}


function isStrike(remainingRolls) {
    return remainingRolls[0] == 10
}
function scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls) {
    return {currentFrameScore: currentFrameScore, nextRemainingRolls: nextRemainingRolls}
}
function applyStrike(remainingRolls) {
    var currentFrameScore = 10 + remainingRolls[1] + remainingRolls[2]
    var nextRemainingRolls = _.drop(remainingRolls, 1);
    return scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls)
}
var strikeCalculator = {
    matches: isStrike,
    calculateScore: applyStrike
}

var spareCalculator = {
    matches: isSpare,
    calculateScore: calculateSpare

}

function isSpare(remainingRolls) {
    return remainingRolls[0] + remainingRolls[1] == 10
}

function calculateSpare(remainingRolls) {
    var currentFrameScore = 10 + remainingRolls[2]
    var nextRemainingRolls = _.drop(remainingRolls, 2);
    return scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls)
}

var normalScoreCalculator = {
    matches: function(){ return true},
    calculateScore:calculateNormalScore
}
function calculateNormalScore(remainingRolls) {
    var currentFrameScore = remainingRolls[0] + remainingRolls[1];
    var nextRemainingRolls = _.drop(remainingRolls, 2);
    return scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls)
}
function recursiveFrameScore(remainingRolls) {
    if (remainingRolls.length === 0) return []

    var scoreAndRemainingRolls;

    if (strikeCalculator.matches(remainingRolls)) {
        scoreAndRemainingRolls = strikeCalculator.calculateScore(remainingRolls);
    }
    else if (spareCalculator.matches(remainingRolls)) {
        scoreAndRemainingRolls = spareCalculator.calculateScore(remainingRolls)
    } else {
        scoreAndRemainingRolls = normalScoreCalculator.calculateScore(remainingRolls)
    }

    var currentFrameScore = scoreAndRemainingRolls.currentFrameScore
    var nextRemainingRolls = scoreAndRemainingRolls.nextRemainingRolls

    return [currentFrameScore].concat(recursiveFrameScore(nextRemainingRolls))
}

function totalScore(allRolls) {
    var framesScores = recursiveFrameScore(allRolls)
    return framesScores.reduce(sum)
}

BowlingScore.totalScore = totalScore

module.exports = BowlingScore
