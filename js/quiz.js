'use strict';
// Correct Answers Array
let score = 0;
let userName;
let retrievedPlayers = JSON.parse(localStorage.getItem('players'));
let allPlayersArray = retrievedPlayers ? retrievedPlayers : [{userName: 'Connor', score: 70}, {userName: 'David', score: 80}, {userName: 'Alex', score: 70}, {userName: 'Will', score: 100}];
const answers = ['B', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'A', 'A'];

const result = document.querySelector('.result');
const quizForm = document.querySelector('.quizForm');
const submitForm = document.querySelector('.new');
const popup = document.querySelector('.popup-wrapper');

const newtry = document.querySelector('.popup');
const feedback = document.querySelector('.feedback');

function Player(userName, score){
  this.userName = userName;
  this.score = score;
  allPlayersArray.push(this);
}

submitForm.addEventListener('click', function (e) {
  e.preventDefault();
  userName = newtry.username.value;
  const requiredNameLength = /^.[a-zA-Z0-9]{1,8}$/;
  if (requiredNameLength.test(userName)) {
    popup.style.display = 'none';
  } else {
    feedback.textContent = 'username should be between 1 and 8 characters';
  }

});

quizForm.addEventListener('submit', function (e) {
  e.preventDefault();

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
    result.querySelector('span').innerHTML = ` Your score is ${score}% , you might need to look at <a href="https://www.javascripttutorial.net/" link="rgb(69, 101, 29)">JS Basics, <a><p> <p><a href="https://developer.mozilla.org/en-US/docs/Glossary/Node.js">JS Knowledge Base<a>`;

  } else if (score <= 90) {
    result.querySelector('span').textContent = ` your score is ${score}%, let's aim for 100% next time`;

  } else {
    result.querySelector('span').textContent = ` your score is ${score}%, You can take the day off`;

  }
  new Player(userName, score);
  allPlayersArray.sort(function (a, b){
    return b.score - a.score;

  });

  localStorage.setItem('players', JSON.stringify(allPlayersArray));
  console.log(allPlayersArray);
  document.getElementById('quiz-form').style.display = 'none';
  document.querySelector('.leaderboard').style.display = 'block';
  displayLeaderboard();
});

function displayLeaderboard() {
  let table = document.getElementById('score-leaderboard');
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  td.textcontent = retrievedPlayers;
  tr.appendChild(td);
  table.appendChild(tr);
  for (let i = 0; i < allPlayersArray.length; i++) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let tdName = document.createElement('td');
    td.textContent = allPlayersArray[i].score;
    tdName.textContent = allPlayersArray[i].userName;
    tr.appendChild(tdName);
    tr.appendChild(td);
    table.appendChild(tr);
  }
}
