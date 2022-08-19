var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
let resetButton = document.querySelector(".reset-button")
let blanks = ""
let word = ""
let wordArray = []
blanksArray = []
gameStart = false
let timeLeft = 10
win.innerHTML = localStorage.getItem("winCount")
lose.innerHTML = localStorage.getItem("lossCount")

var wordOptions = ["brewer","atlas","laya"]

function getRandom(x) {
  return Math.floor(Math.random() * x)
}

function wordPicker() {
  x = wordOptions.length
  word = wordOptions[getRandom(x)]
  wordArray = word.split("")
  console.log(wordArray)
  blanksArray = []
  for (i = 0; i < wordArray.length; i++) {
    blanksArray.push("_")
  }
  console.log(blanksArray)
  blanks = blanksArray.join(" ")
  console.log(blanks)
  return word
}

// wordPicker()
console.log(word)

startButton.addEventListener("click", function() {
  wordPicker()
  wordBlank.innerHTML = blanks
  gameStart = true
  console.log(gameStart)
  countdown()
})

document.addEventListener("keydown", function(event) {
  if (!gameStart) {
    console.log(gameStart)
    return
  }
  let keyPress = event.key
  if (wordArray.includes(keyPress)) {
    guessChecker(keyPress)
  }
})

function guessChecker(keyPress) {
  let guessBool = []
  for (i = 0; i < wordArray.length; i++) {
    if (keyPress == wordArray[i]) {
      blanksArray[i] = keyPress
      blanks = blanksArray.join(" ")
      wordBlank.innerHTML = blanks
      console.log(blanksArray)
    }
  }
  for (i = 0; i < wordArray.length; i++) {
    if (blanksArray[i] == wordArray[i]) {
      guessBool.push(true)
    }
    else {
      guessBool.push(false)
    }
  }
  if (!guessBool.includes(false)) {
    gameStart = false
    console.log("winner")
    winRecord()
  }
}

function winRecord() {
  let winCount = localStorage.getItem("winCount")
  winCount++
  win.innerHTML = winCount
  localStorage.setItem("winCount",winCount)
}

function lossRecord() {
  let lossCount = localStorage.getItem("lossCount")
  lossCount++
  lose.innerHTML = lossCount
  localStorage.setItem("lossCount",lossCount)
}

function countdown() {
  timeLeft = 10
  timerElement.innerHTML = timeLeft
  let timeInterval = setInterval(function(){
    timeLeft--
    timerElement.innerHTML = timeLeft
    if (timeLeft == 0) {
      clearInterval(timeInterval)
      gameStart = false
      console.log(gameStart)
      lossRecord()
    }
    else if (!gameStart) {
      clearInterval(timeInterval)
    }
  },1000)
}

resetButton.addEventListener("click", function() {
  localStorage.setItem("lossCount","0")
  localStorage.setItem("winCount","0")
  win.innerHTML = localStorage.getItem("winCount")
  lose.innerHTML = localStorage.getItem("lossCount")
})