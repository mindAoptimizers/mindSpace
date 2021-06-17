'use strict';

// Global variabls
let filterSubject = [];
let allPosts = [];

// const journalEntryLog = document.querySelector(''); 

// JS to HTML links
const cardTemplate = document.querySelector('.post-template__card');
const addPostButton = document.querySelector('.header-nav__item--cta');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const savePostButton = document.querySelector('.modal__actions button:nth-child(2)');
const modalCancelButton = document.querySelector('.modal__action--negative');
const postForm = document.querySelector('.post-form');

// temp hook to DOM *** TO DELETE AFTER *** used for testing no post message
// const postCard = document.querySelector('main h1');

// set event listeners
savePostButton.addEventListener('click', addPost);
modalCancelButton.addEventListener('click', closeModal);

// Event listener for addPost button to open backdrop & modal
addPostButton.addEventListener('click', function() {
  modal.classList.add('open');
  backdrop.classList.add('open');
});

// Post constructor
function Post(title, post, subject, difficulty, favorite, image) {
  this.title = title;
  this.post = post;
  this.subject = subject;
  this.difficulty = difficulty;
  this.favorite = favorite;
  this.image = image;
  this.postDate = new Date().toString();
  allPosts.push(this);
}

// toggle favorite method
Post.prototype.favoriteToggle = function() {
// TODO
};

// *** Functions ***

function closeModal() {
  postForm.reset();
  modal.classList.remove('open');
  backdrop.classList.remove('open');
}

// add post method
function addPost(event) {
  // DONE: build new post object and add to allPosts array.
  buildPosts(event);
  // DONE: close the modal dialog and the backdrop & reset the form.
  closeModal();
  // TODO: Render the new post at the top of the list.
  renderPostCard();
}

// edit post method
function editPost() {
  // TODO: Allows a post to be edited and will update the local storage/DOM when saved. Cancel no change.
}

// delete post method
function deletePost() {
  // TODO: Delete a post from the allPosts array and upate local storage & render.
}

// load local storage data
function loadLocalData() {
  // TODO: check if local storage exists and if does, load & send the objects to the allPosts array.
  // render the posts. If no local storage display a no posts message
  let postsData = JSON.parse(localStorage.getItem('posts'));
  if (postsData) {
    allPosts = postsData;
    console.log('data found in local storage');
  } else {
    console.log('no data found in local storage');
    renderNoPosts();
  }
}

// save posts to local storage
function saveLocalData() {
  // DONE: to save allPosts array to local storage.
  localStorage.setItem('posts', JSON.stringify(allPosts));
}

// build post object from add/edit modal and populate array
function buildPosts(event) {
  // TODO: build new object from user data and validate.
  // vaidation needs to be added.
  event.preventDefault();
  const title = postForm.title.value;
  const post = postForm.post.value;
  const subject = postForm.subject.value;
  const difficulty = postForm.difficulty.value;
  const favorite = postForm.favorite.checked ? true : false;
  let image;
  switch (subject) {
  case 'html':
    image = 'img/html_logo2.png';
    break;
  case 'css':
    image = 'img/css_logo.png';
    break;
  case 'js':
    image = 'img/JS_logo.png';
    break;
  case 'react':
    image = 'img/react_logo.png';
    break;
  case 'mongo':
    image = 'img/mongodb-logo.png';
    break;
  default:
    image = 'img/no-logo.png';
  }
  new Post(title, post, subject, difficulty, favorite, image);
  saveLocalData();
}

function renderPostCard() {
  // TODO
  let newCard = cardTemplate.cloneNode(true);
  let today = new Date();
  let date = today.getFullYear() + ‘-’ + (today.getMonth()+1) + ‘-’ + today.getDate();
  let cardParent = document.querySelector('.post-card');
  newCard.querySelector('h1').textContent = 'Copy of template Card';
  cardParent.appendChild(newCard);
}

function renderNoPosts() {
  // TODO: display a no posts message to screen
  // postCard.textContent = 'No posts found in local storage';
}

// filter & render

// Start site
loadLocalData();
