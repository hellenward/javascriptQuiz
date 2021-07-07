'use strict'

let questionLink = 'questions.json'
let request = new XMLHttpRequest()
request.open('GET', questionLink)
request.responseType = 'json'
request.send()

request.onload = function () {
  const questionsObject = request.response

  const questions = shuffle(questionsObject.questions)
  const totalQuestions = questionsObject.questions.length

  function shuffle (array) {
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

    if (questions.length === 0) {
      finishGame()
    } else {
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
      document.querySelector('.moreInfo').classList.add('hidden')
      document.querySelector('.nextQuestion').classList.add('hidden')

      for (let i = 0; i < questions[0].incorrectAnswers.length; i++) {
        answerSelectionArray.push(questions[0].incorrectAnswers[i])
      }

      answerSelectionArray.push(questions[0].correctAnswer)
      shuffle(answerSelectionArray)

      document.querySelector(
        '.questionNumber'
      ).textContent = `Question ${currentQuestion + 1}`

      document.querySelector(
        '.question'
      ).textContent = `${questions[0].question}`

      document.querySelector('.answer1').textContent = answerSelectionArray[0]
      document.querySelector('.answer2').textContent = answerSelectionArray[1]
      document.querySelector('.answer3').textContent = answerSelectionArray[2]
      document.querySelector('.answer4').textContent = answerSelectionArray[3]
      document.querySelector('.moreInfo').textContent = questions[0].moreInfo
    }
  }

  const checkForCorrectAnswer = element => {
    document.querySelector(`.${element}`).classList.remove('neutralClass')

    if (
      document.querySelector(`.${element}`).textContent ===
      questions[0].correctAnswer
    ) {
      document.querySelector(`.${element}`).classList.add('correctClass')
      score++
      document.querySelector('.score').textContent = `Score: ${score}`
    } else {
      document.querySelector(`.${element}`).classList.add('incorrectClass')
    }
    for (let i = 0; i <= answerSelectionArray.length; i++) {
      if (answerSelectionArray[i] === questions[0].correctAnswer) {
        const correct = i + 1
        document
          .querySelector(`.answer${correct}`)
          .classList.add('correctClass')
      }
    }
    document.querySelector('.moreInfo').classList.remove('hidden')
    document.querySelector('.nextQuestion').classList.remove('hidden')
    questions.splice(0, 1)
    console.log(questions)
  }

  const finishGame = () => {
    document.querySelector('.answer1').classList.add('hidden')
    document.querySelector('.answer2').classList.add('hidden')
    document.querySelector('.answer3').classList.add('hidden')
    document.querySelector('.answer4').classList.add('hidden')
    document.querySelector('.score').classList.add('hidden')
    document.querySelector('.moreInfo').classList.add('hidden')
    document.querySelector('.choose').classList.add('hidden')
    document.querySelector('.questionNumber').classList.add('hidden')
    document.querySelector('.nextQuestion').classList.add('hidden')
    document.querySelector(
      '.question'
    ).textContent = `Congratulations, you completed the quiz! Your final score is ${score} out of ${totalQuestions}`
  }

  let currentQuestion = 0
  let answerSelectionArray = []
  let score = 0
  document.querySelector('.score').textContent = `Score: ${score}`
  initialise()

  document.querySelector('.answer1').addEventListener('click', function () {
    checkForCorrectAnswer('answer1')
    document.querySelector('.answer2').classList.add('unclickable')
    document.querySelector('.answer3').classList.add('unclickable')
    document.querySelector('.answer4').classList.add('unclickable')
  })

  document.querySelector('.answer2').addEventListener('click', function () {
    checkForCorrectAnswer('answer2')
    document.querySelector('.answer1').classList.add('unclickable')
    document.querySelector('.answer3').classList.add('unclickable')
    document.querySelector('.answer4').classList.add('unclickable')
  })

  document.querySelector('.answer3').addEventListener('click', function () {
    checkForCorrectAnswer('answer3')
    document.querySelector('.answer1').classList.add('unclickable')
    document.querySelector('.answer2').classList.add('unclickable')
    document.querySelector('.answer4').classList.add('unclickable')
  })

  document.querySelector('.answer4').addEventListener('click', function () {
    checkForCorrectAnswer('answer4')
    document.querySelector('.answer1').classList.add('unclickable')
    document.querySelector('.answer2').classList.add('unclickable')
    document.querySelector('.answer3').classList.add('unclickable')
  })

  document
    .querySelector('.nextQuestion')
    .addEventListener('click', function () {
      currentQuestion++
      document.querySelector('.answer1').classList.remove('unclickable')
      document.querySelector('.answer2').classList.remove('unclickable')
      document.querySelector('.answer3').classList.remove('unclickable')
      document.querySelector('.answer4').classList.remove('unclickable')

      initialise()
    })
}
