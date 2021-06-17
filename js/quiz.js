'use strict'

const answers = ['B', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'A', 'A'];

const submitButton = document.getElementById('results');
const quizForm = document.querySelector('.form');

quizForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let score = 0;
  const userAnswers = [quizForm.q1.value, quizForm.q2.value, quizForm.q3.value, quizForm.q4.value, quizForm.q5.value, quizForm.q6.value, quizForm.q7.value, quizForm.q8.value, quizForm.q8.value, quizForm.q9.value, quiz.q10.value];

  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += 25;
    }

  });
