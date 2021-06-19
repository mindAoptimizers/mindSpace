'use strict';
// Correct Answers Array
const answers = ['B', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'A', 'A'];

const result = document.querySelector('.result');
const quizForm = document.querySelector('.quizForm');
const submitForm = document.querySelector('.new');
const popup = document.querySelector('.popup-wrapper');
const newtry = document.querySelector('.popup');
const feedback = document.querySelector('.feedback');

submitForm.addEventListener('click', function (e) {
  e.preventDefault();
  let userName = newtry.username.value;
  const requiredNameLength = /^.[a-zA-Z0-9]{1,8}$/;
  if (requiredNameLength.test(userName)) {
    popup.style.display = 'none';
  } else {
    feedback.textContent = 'username should be between 1 and 8 characters';
  }


});

quizForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let score = 0;

  //checking user input from the form.
  const userAnswers = [quizForm.q1.value, quizForm.q2.value, quizForm.q3.value, quizForm.q4.value, quizForm.q5.value, quizForm.q6.value, quizForm.q7.value, quizForm.q8.value, quizForm.q9.value, quizForm.q10.value];

  // verifying answers and increamenting scores
  userAnswers.forEach(function (answer, i) {
    if (answer === answers[i]) {
      score += 10;
    }

  });
  scrollTo(0, 0);
  result.style.display = 'block';
  if (score <= 50) {
    result.querySelector('span').textContent = ` Your score is ${score}% ,you might need to look at`;

  } else if (score <= 90) {
    result.querySelector('span').textContent = ` your score is ${score}%, let's aim for 100% next time`;

  } else {
    result.querySelector('span').textContent = ` your score is ${score}%, You can take the day off`;

  }

});


