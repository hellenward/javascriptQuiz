'use strict'

const questions = [
  {
    questionNumber: 1,
    question: 'What is a high level language?',
    incorrectAnswers: [
      'It only works at an altitude of 5,000 feet or higher',
      'It is the favoured languages of important people like executives',
      "You don't need to know how it works, just that it does"
    ],
    correctAnswer:
      "It contains abstractions to manage hardware resources for you, you don't have to worry about it",
    moreInfo:
      'There are a low level languages, such as C, which requires the user to manage hardware resources such as memory or CPU. High level languages, such as Javascript, do not require this as they contain abstractions to do that job for us. This has its advantages but the downside is that it may not be as fast or optimised as some of the lower level languages.'
  },
  {
    questionNumber: 2,
    question: 'What is garbage collection?',
    incorrectAnswers: [
      'The people who come and take my rubbish away once a week or so',
      `Javascript will delete the repo once I'm finished using it`,
      "Javascript will delete incorrect or duplicate code from your repo as it compiles so you don't end up with bloated code"
    ],
    correctAnswer:
      'It helps your computer by removing old unused objects from its memory',
    moreInfo:
      'It’s an algorithm inside of the JS engine which removes old unused objects from the computer memory so it doesn’t clog up your computer.'
  }
]

const shuffle = array => {
  var currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }

  return array
}

const initialise = () => {
  answerSelectionArray = []

  document.querySelector('.answer1').classList.remove('incorrectClass')
  document.querySelector('.answer1').classList.remove('correctClass')
  document.querySelector('.answer1').classList.add('neutralClass')
  document.querySelector('.answer2').classList.remove('incorrectClass')
  document.querySelector('.answer2').classList.remove('correctClass')
  document.querySelector('.answer2').classList.add('neutralClass')
  document.querySelector('.answer3').classList.remove('incorrectClass')
  document.querySelector('.answer3').classList.remove('correctClass')
  document.querySelector('.answer3').classList.add('neutralClass')
  document.querySelector('.answer4').classList.remove('incorrectClass')
  document.querySelector('.answer4').classList.remove('correctClass')
  document.querySelector('.answer4').classList.add('neutralClass')
  document.querySelector('.nextQuestion').classList.add('hidden')
  document.querySelector('.moreInfo').classList.add('hidden')

  for (let i = 0; i < questions[currentQuestion].incorrectAnswers.length; i++) {
    answerSelectionArray.push(questions[currentQuestion].incorrectAnswers[i])
  }

  answerSelectionArray.push(questions[currentQuestion].correctAnswer)
  shuffle(answerSelectionArray)

  document.querySelector(
    '.questionNumber'
  ).textContent = `Question ${questions[currentQuestion].questionNumber}`

  document.querySelector(
    '.question'
  ).textContent = `${questions[currentQuestion].question}`

  document.querySelector('.answer1').textContent = answerSelectionArray[0]
  document.querySelector('.answer2').textContent = answerSelectionArray[1]
  document.querySelector('.answer3').textContent = answerSelectionArray[2]
  document.querySelector('.answer4').textContent = answerSelectionArray[3]
  document.querySelector('.moreInfo').textContent =
    questions[currentQuestion].moreInfo
}

const checkForCorrectAnswer = element => {
  document.querySelector(`.${element}`).classList.remove('neutralClass')

  if (
    document.querySelector(`.${element}`).textContent ===
    questions[currentQuestion].correctAnswer
  ) {
    document.querySelector(`.${element}`).classList.add('correctClass')
  } else {
    document.querySelector(`.${element}`).classList.add('incorrectClass')
  }
  document.querySelector('.nextQuestion').classList.remove('hidden')
  document.querySelector('.moreInfo').classList.remove('hidden')
}

let currentQuestion = 0
let answerSelectionArray = []
initialise()

document.querySelector('.answer1').addEventListener('click', function () {
  checkForCorrectAnswer('answer1')
})

document.querySelector('.answer2').addEventListener('click', function () {
  checkForCorrectAnswer('answer2')
})

document.querySelector('.answer3').addEventListener('click', function () {
  checkForCorrectAnswer('answer3')
})

document.querySelector('.answer4').addEventListener('click', function () {
  checkForCorrectAnswer('answer4')
})

document.querySelector('.nextQuestion').addEventListener('click', function () {
  currentQuestion++
  initialise()
})
