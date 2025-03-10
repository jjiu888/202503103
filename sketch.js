let questions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let userAnswer = "";
let result = "";
let correctQuestions = [];
let incorrectQuestions = [];
let radio;

function setup() {
  createCanvas(1900, 1000);
  generateQuestions();
  displayQuestion();
}

function draw() {
  background(255, 200, 221);
  textSize(24);
  fill(result === "Correct!" ? 'purple' : 'black');
  text(result, width / 2 - textWidth(result) / 2, height / 2 + 150);
  // 顯示左上角文字
  textSize(16);
  fill(0);
  text("412737255 陳暐欣", 10, 30);
  text(`Correct answers: ${correctAnswers}`, 10, 50);
  text(`Incorrect answers: ${incorrectAnswers}`, 10, 70);
  text(`Correct questions: ${correctQuestions.join(', ')}`, 10, 90);
  text(`Incorrect questions: ${incorrectQuestions.join(', ')}`, 10, 110);
}

function generateQuestions() {
  for (let i = 0; i < 3; i++) {
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let isAddition = Math.random() > 0.5;
    let question = `${num1} ${isAddition ? '+' : '-'} ${num2}`;
    let correctAnswer = isAddition ? num1 + num2 : num1 - num2;
    questions.push({ question, options: generateOptions(correctAnswer), correctAnswer: correctAnswer.toString() });
  }
}

function generateOptions(correctAnswer) {
  let options = [correctAnswer];
  while (options.length < 4) {
    let option = Math.floor(Math.random() * 19) - 9; // 產生 -9 到 9 的數字
    if (!options.includes(option)) {
      options.push(option);
    }
  }
  return options.sort(() => Math.random() - 0.5); // 隨機排序選項
}

function displayQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let questionP = createP(currentQuestion.question);
  questionP.style('font-size', '24px');
  questionP.position(width / 2 - textWidth(currentQuestion.question) / 2, height / 2 - 120);

  radio = createRadio();
  for (let i = 0; i < currentQuestion.options.length; i++) {
    radio.option(currentQuestion.options[i].toString());
  }
  radio.style('font-size', '18px');
  radio.position(width / 2 - 50, height / 2 - 60);
  radio.changed(() => userAnswer = radio.value());

  let submitButton = createButton('Submit');
  submitButton.style('font-size', '18px');
  submitButton.position(width / 2 - submitButton.width / 2, height / 2 + 100);
  submitButton.mousePressed(() => checkAnswer(currentQuestion));
}

function checkAnswer(currentQuestion) {
  if (userAnswer === currentQuestion.correctAnswer) {
    result = "Correct!";
    correctAnswers++;
    correctQuestions.push(currentQuestion.question);
    questions.splice(currentQuestionIndex, 1); // 移除答對的題目
    currentQuestionIndex = 0; // 重置索引以顯示下一題
    radio.remove(); // 移除 radio
    nextQuestion();
  } else {
    result = "Incorrect!";
    incorrectAnswers++;
    incorrectQuestions.push(currentQuestion.question);
  }
}

function nextQuestion() {
  if (questions.length > 0) {
    displayQuestion();
  } else {
    displayResult();
  }
}

function displayResult() {
  result = `Test completed! Correct answers: ${correctAnswers}, Incorrect answers: ${incorrectAnswers}`;
  text(result, width / 2 - textWidth(result) / 2, height / 2 + 150);

  let correctList = createP(`Correct questions: ${correctQuestions.join(', ')}`);
  correctList.position(20, height / 2 + 200);
  let incorrectList = createP(`Incorrect questions: ${incorrectQuestions.join(', ')}`);
  incorrectList.position(20, height / 2 + 250);
}
