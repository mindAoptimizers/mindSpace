'use strict';
// Correct Answers Array
const answers = ['B', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'A', 'A'];

const result = document.querySelector('.result');
const quizForm = document.querySelector('.quizForm');
const submitForm = document.querySelector('.new');
const popup = document.querySelector('.popup-wrapper');

submitForm.addEventListener('click', function (e) {
  e.preventDefault();
  popup.style.display = 'none';


});

quizForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let score = 0;

  //checking user input from the form.
  const userAnswers = [quizForm.q1.value, quizForm.q2.value, quizForm.q3.value, quizForm.q4.value, quizForm.q5.value, quizForm.q6.value, quizForm.q7.value, quizForm.q8.value, quizForm.q9.value, quizForm.q10.value];

  // verifying answers and increamenting scores
  userAnswers.forEach(function (answer, index) {
    if (answer === answers[index]) {
      score += 10;
    }

  });
  scrollTo(0, 0);
  result.querySelector('span').textContent = `${score}%`;


});
