'use strict'

let questionLink = 'questions.json'
let request = new XMLHttpRequest()
request.open('GET', questionLink)
request.responseType = 'json'
request.send()

request.onload = function () {
  const questionsObject = request.response

  const questions = questionsObject.questions

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

    console.log(questions[0])

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

    for (
      let i = 0;
      i < questions[currentQuestion].incorrectAnswers.length;
      i++
    ) {
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

  document
    .querySelector('.nextQuestion')
    .addEventListener('click', function () {
      currentQuestion++
      initialise()
    })
}
