'use strict';

// Global variables
let filterSubject = [];
let allPosts = [];

// JS to HTML links
const cardTemplate = document.querySelector('.post-template__card');
const addPostButton = document.querySelector('.header-nav__item--cta');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const logoImage = document.querySelector('.header-main__brand');
const modalSummary = document.querySelector('.modal__summary');
const modalSummaryDetail = document.querySelector('.modal-summary__detail');
const modalSummaryButton = document.querySelector('#summary-close');
const savePostButton = document.querySelector('#save-post');
const modalCancelButton = document.querySelector('#cancel-post');
const modalDelete = document.querySelector('.modal__delete');
const modalDeleteCancelButton = modalDelete.querySelector('#delete-cancel');
const modalDeleteYesButton = modalDelete.querySelector('#delete-yes');
const postForm = document.querySelector('.post-form');
const postDeleteButton = document.querySelector('.post-cards');
const postEditButton = document.querySelector('.post-cards');
const postFavoriteButton = document.querySelector('.post-cards');
const postContainer = document.querySelector('.post-cards');
const filterItemsContainer = document.querySelector('.filter-main__items');
const filterFavoriteSwitch = document.querySelector('.filter-main__favorite');

// set event listeners
// savePostButton.addEventListener('submit', addPost);
postForm.addEventListener('submit', addPost);
logoImage.addEventListener('click', displaySummary);
modalSummaryButton.addEventListener('click', modalSummaryClose);
modalCancelButton.addEventListener('click', closeModal);
postDeleteButton.addEventListener('click', deletePostHandler);
postEditButton.addEventListener('click', editPost);
filterItemsContainer.addEventListener('click', filterCheckedHandler);
postFavoriteButton.addEventListener('click', favoriteClickHandler);
modalDeleteCancelButton.addEventListener('click', closeDeleteModal);
modalDeleteYesButton.addEventListener('click', deletePost);
filterFavoriteSwitch.addEventListener('click', filterFavoriteHandler);

// Set some object values to reuse code
savePostButton.mode = 'add';

// Event listener for addPost button to open backdrop & modal
addPostButton.addEventListener('click', openModal);

// Validation check for post title on the input element
const inputTitle = document.querySelector('.post-form #title');
inputTitle.addEventListener('input', function() {
  if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity('A Title is required for the post.');
  } else {
    inputTitle.setCustomValidity('');
  }
});

// Validation check for post body on the textarea element
const inputPost = document.querySelector('.post-form #post');
inputPost.addEventListener('input', function() {
  if (inputPost.validity.valueMissing) {
    inputPost.setCustomValidity('A body entry for the post is required.');
  } else {
    inputPost.setCustomValidity('');
  }
});

// Post constructor
function Post(id, title, post, subject, difficulty, favorite, image) {
  this.id = id;
  this.title = title;
  this.post = post;
  this.subject = subject;
  this.difficulty = difficulty;
  this.favorite = favorite;
  this.image = image;
  this.postDate = Date();
  allPosts.push(this);
}

// *** Functions ***
function openModal() {
  // DONE: opens the modal.
  modal.classList.add('open');
  backdrop.classList.add('open');
}

// DONE: check for favorite switch being on/off then ensure posts are filtered
function filterFavoriteHandler(event) {
  event.stopPropagation();
  const favorite = event.target.checked;
  renderPostsLoop(renderPosts(favorite));
}

// Function to toggle a post as favorite
function favoriteClickHandler(event) {
  // DONE
  if ((event.target.textContent === 'Favorite') || (event.target.textContent === 'Un-Favor')) {
    const postIndex = event.target.id;
    if (allPosts[postIndex].favorite) {
      allPosts[postIndex].favorite = false;
      event.target.classList.remove('post-card__favorite-selected');
      event.target.textContent = 'Favorite';
    } else {
      allPosts[postIndex].favorite = true;
      event.target.classList.add('post-card__favorite-selected');
      event.target.textContent = 'Un-Favor';
    }
    saveLocalData();
  }
}

// Closes the main add post/edit post modal
function closeModal() {
  // DONE
  postForm.reset();
  postForm.previousElementSibling.textContent = 'Blog Post Entry';
  modal.classList.remove('open');
  backdrop.classList.remove('open');
  savePostButton.mode = 'add';
}

// Handler for the delete confirmation modal to open
function deletePostHandler(event) {
  //DONE
  if (event.target.textContent !== 'Delete') {
    return;
  }
  modalDelete.classList.add('open');
  backdrop.classList.add('open');
  modalDeleteYesButton.id = event.target.id;
}

function displaySummary() {
  // DONE: Opens the modal summary and runs getSummaryInfo funciton.
  modalSummary.classList.add('open');
  backdrop.classList.add('open');
  getSummaryInfo();
}

function modalSummaryClose() {
  // DONE: closes the summary modal when done close is clicked.
  modalSummaryDetail.innerHTML = '';
  modalSummary.classList.remove('open');
  backdrop.classList.remove('open');
}

function getSummaryInfo() {
  // DONE: gets the totals needed for the summary modal
  const totals = {
    js: 0,
    html: 0,
    css: 0,
    react: 0,
    mongo: 0,
    beginner: 0,
    intermediate: 0,
    advance: 0,
    favorite: 0,
    totalPosts: 0
  };
  for (let i = 0; i < allPosts.length; i++) {
    if (allPosts[i].favorite) {
      totals.favorite++;
    }
    if (allPosts[i].difficulty === 'Beginner') {
      totals.beginner++;
    }
    if (allPosts[i].difficulty === 'Intermediate') {
      totals.intermediate++;
    }
    if (allPosts[i].difficulty === 'Advance') {
      totals.advance++;
    }
    switch (allPosts[i].subject) {
    case 'js' :
      totals.js ++;
      break;
    case 'html' :
      totals.html ++;
      break;
    case 'css' :
      totals.css ++;
      break;
    case 'react' :
      totals.react ++;
      break;
    case 'mongodb' :
      totals.mongo ++;
      break;
    default :
        //
    }
  }
  totals.totalPosts = allPosts.length;
  renderSummary(totals);
}

function renderSummary(totals) {
  // DONE: creates the table in the modal for the summary info
  const summaryTable = document.createElement('tb');
  let summaryTableRow = document.createElement('tr');
  let summaryTableCellLabel = document.createElement('td');
  let summaryTableCellData = document.createElement('td');
  summaryTableCellLabel.textContent = 'Total Posts';
  summaryTableCellData.textContent = totals.totalPosts;
  summaryTableRow.appendChild(summaryTableCellLabel);
  summaryTableRow.appendChild(summaryTableCellData);
  summaryTable.appendChild(summaryTableRow);
  modalSummaryDetail.appendChild(summaryTable);

  summaryTableRow = document.createElement('tr');
  summaryTableCellLabel = document.createElement('td');
  summaryTableCellData = document.createElement('td');
  summaryTableCellLabel.textContent = 'JavaScript';
  summaryTableCellData.textContent = totals.js;
  summaryTableRow.appendChild(summaryTableCellLabel);
  summaryTableRow.appendChild(summaryTableCellData);
  summaryTable.appendChild(summaryTableRow);
  modalSummaryDetail.appendChild(summaryTable);

  summaryTableRow = document.createElement('tr');
  summaryTableCellLabel = document.createElement('td');
  summaryTableCellData = document.createElement('td');
  summaryTableCellLabel.textContent = 'HTML';
  summaryTableCellData.textContent = totals.html;
  summaryTableRow.appendChild(summaryTableCellLabel);
  summaryTableRow.appendChild(summaryTableCellData);
  summaryTable.appendChild(summaryTableRow);
  modalSummaryDetail.appendChild(summaryTable);

  summaryTableRow = document.createElement('tr');
  summaryTableCellLabel = document.createElement('td');
  summaryTableCellData = document.createElement('td');
  summaryTableCellLabel.textContent = 'CSS';
  summaryTableCellData.textContent = totals.css;
  summaryTableRow.appendChild(summaryTableCellLabel);
  summaryTableRow.appendChild(summaryTableCellData);
  summaryTable.appendChild(summaryTableRow);
  modalSummaryDetail.appendChild(summaryTable);

  summaryTableRow = document.createElement('tr');
  summaryTableCellLabel = document.createElement('td');
  summaryTableCellData = document.createElement('td');
  summaryTableCellLabel.textContent = 'React';
  summaryTableCellData.textContent = totals.react;
  summaryTableRow.appendChild(summaryTableCellLabel);
  summaryTableRow.appendChild(summaryTableCellData);
  summaryTable.appendChild(summaryTableRow);
  modalSummaryDetail.appendChild(summaryTable);

  summaryTableRow = document.createElement('tr');
  summaryTableCellLabel = document.createElement('td');
  summaryTableCellData = document.createElement('td');
  summaryTableCellLabel.textContent = 'MongoDB';
  summaryTableCellData.textContent = totals.mongo;
  summaryTableRow.appendChild(summaryTableCellLabel);
  summaryTableRow.appendChild(summaryTableCellData);
  summaryTable.appendChild(summaryTableRow);

  summaryTableRow = document.createElement('tr');
  summaryTableCellLabel = document.createElement('td');
  summaryTableCellData = document.createElement('td');
  summaryTableCellLabel.textContent = 'Favorites';
  summaryTableCellData.textContent = totals.favorite;
  summaryTableRow.appendChild(summaryTableCellLabel);
  summaryTableRow.appendChild(summaryTableCellData);
  summaryTable.appendChild(summaryTableRow);
  modalSummaryDetail.appendChild(summaryTable);

  summaryTableRow = document.createElement('tr');
  summaryTableCellLabel = document.createElement('td');
  summaryTableCellData = document.createElement('td');
  summaryTableCellLabel.textContent = 'Beginner';
  summaryTableCellData.textContent = totals.beginner;
  summaryTableRow.appendChild(summaryTableCellLabel);
  summaryTableRow.appendChild(summaryTableCellData);
  summaryTable.appendChild(summaryTableRow);
  modalSummaryDetail.appendChild(summaryTable);

  summaryTableRow = document.createElement('tr');
  summaryTableCellLabel = document.createElement('td');
  summaryTableCellData = document.createElement('td');
  summaryTableCellLabel.textContent = 'Intermediate';
  summaryTableCellData.textContent = totals.intermediate;
  summaryTableRow.appendChild(summaryTableCellLabel);
  summaryTableRow.appendChild(summaryTableCellData);
  summaryTable.appendChild(summaryTableRow);
  modalSummaryDetail.appendChild(summaryTable);

  summaryTableRow = document.createElement('tr');
  summaryTableCellLabel = document.createElement('td');
  summaryTableCellData = document.createElement('td');
  summaryTableCellLabel.textContent = 'Advance';
  summaryTableCellData.textContent = totals.advance;
  summaryTableRow.appendChild(summaryTableCellLabel);
  summaryTableRow.appendChild(summaryTableCellData);
  summaryTable.appendChild(summaryTableRow);
  modalSummaryDetail.appendChild(summaryTable);

  modalSummaryDetail.appendChild(summaryTable);
}

// Handlre to close the delete confirmation modal
function closeDeleteModal() {
  //DONE
  modalDelete.classList.remove('open');
  backdrop.classList.remove('open');
}

// function to add new posts and execute other functions
function addPost(event) {
  // DONE: build new post object and add to allPosts array.
  buildPosts(event);
  // DONE: close the modal dialog and the backdrop & reset the form.
  closeModal();
}

// function to edit a post
function editPost(event) {
  // DONE: Allows a post to be edited and will update the local storage/DOM when saved. Cancel no change.
  if (event.target.textContent !== 'Edit') {
    return;
  }
  const id = +event.target.id;
  savePostButton.id = id;
  savePostButton.mode = 'edit';
  openModal();
  postForm.previousElementSibling.textContent = 'Edit Blog Post';
  postForm.title.value = allPosts[id].title;
  postForm.post.value = allPosts[id].post;
  postForm.subject.value = allPosts[id].subject;
  postForm.difficulty.value = allPosts[id].difficulty;
  postForm.favorite.checked = allPosts[id].favorite;
}

// function to delete a post
function deletePost(event) {
  // DONE: Delete a post from the allPosts array and upate local storage & render.
  const num = parseInt(event.target.id);
  let newArray = allPosts.filter(post => post.id !== num);
  allPosts = [...newArray];
  for(let i = 0; i < allPosts.length; i++){
    allPosts[i].id = i;
  }
  saveLocalData();
  closeDeleteModal();
}

function loadLocalData() {
  // DONE: check if local storage exists and if does, load & send the objects to the allPosts array.
  // render the posts using the renderPostsLoop. If no local storage display a no posts message
  let postsData = JSON.parse(localStorage.getItem('posts'));
  if (postsData) {
    allPosts = [...postsData];
    renderPostsLoop(allPosts);
  }
}

function renderPostsLoop(data) {
  // DONE loop over the allPosts array and render each card to post-cards DOM element.
  for (let i = 0; i < data.length; i++) {
    renderPostCard(data, i);
  }
}

function saveLocalData() {
  // DONE: to save allPosts array to local storage.
  // clears the inner HTML for post-cards (all posts).
  // renders all posts again. This to get the updated index numbers after a delete.
  postContainer.innerHTML = '';
  const favorite = filterFavoriteSwitch.checked;
  renderPostsLoop(renderPosts(favorite));
  localStorage.setItem('posts', JSON.stringify(allPosts));
}

function buildPosts(event) {
  // DONE: build new object from user data and validate.
  // DONE: validation needs to be added.
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
  case 'mongodb':
    image = 'img/mongodb-logo.png';
    break;
  default:
    image = 'img/no-logo.png';
  }
  if(savePostButton.mode === 'add'){
    const idNumber = allPosts.length;
    new Post(idNumber, title, post, subject, difficulty, favorite, image);
  } else {
    const idNumber = savePostButton.id;
    allPosts[idNumber].title = title;
    allPosts[idNumber].post = post;
    allPosts[idNumber].subject = subject;
    allPosts[idNumber].difficulty = difficulty;
    allPosts[idNumber].favorite = favorite;
    allPosts[idNumber].image = image;
    allPosts[idNumber].postDate = Date() + ' - Edited';
    savePostButton.mode = 'add';
    savePostButton.id = '';
  }
  saveLocalData();
}
// function to render the post cards to main screen. This uses a template that is in the HTML as
// the source and copies it, populates the needed textContent, sets other values in event objects.
function renderPostCard(data, index) {
  // DONE
  let newCard = cardTemplate.cloneNode(true);
  let cardParent = document.querySelector('.post-cards');
  let cardFirstChild = cardParent.firstChild;
  newCard.querySelector('.post-card__title h1').textContent = data[index].title;
  newCard.querySelector('.post-card__title h2').textContent = data[index].postDate;
  newCard.querySelector('.post-card__level h2').textContent = data[index].difficulty;
  newCard.querySelector('.post-card__body p').textContent = data[index].post;
  newCard.querySelector('.post-card__image img').src = data[index].image;
  newCard.querySelector('.post-card__image img').alt = data[index].subject;
  newCard.className = 'post-card';
  newCard.querySelector('.post-card__delete').id = data[index].id;
  newCard.querySelector('.post-card__edit').id = data[index].id;
  newCard.querySelector('.post-card__favorite').id = data[index].id;
  data[index].favorite ? newCard.querySelector('.post-card__favorite').classList.add('post-card__favorite-selected') : null ;
  data[index].favorite ? newCard.querySelector('.post-card__favorite').textContent = 'Un-Favor' : null ;
  cardParent.insertBefore(newCard, cardFirstChild);
}

// filter & render
function filterCheckedHandler(event) {
  // DONE checks what filters are set active on the subjects then. Stores them in a temp array or removes
  // a subject when turned off. At end will call renderPostsLoop to render all the posts with the filtered data
  // that is received from the renderPosts function.
  event.stopPropagation();
  if (event.target.tagName !== 'INPUT') {
    return;
  }
  const favorite = filterFavoriteSwitch.checked;
  if (event.target.checked) {
    filterSubject.push(event.target.id);
  } else if (!event.target.checked) {
    let i = 0;
    while ( i < filterSubject.length) {
      if (filterSubject[i] === event.target.id) {
        filterSubject.splice(i, 1);
      } else {
        i++;
      }
    }
  }
  renderPostsLoop(renderPosts(favorite));
}

function renderPosts(favorite) {
  // DONE The main function that handles the filtering, if needed and returns this data.
  if (!filterSubject.length && !favorite) {
    postContainer.innerHTML = '';
    return allPosts;
  } else if (!filterSubject.length && favorite) {
    postContainer.innerHTML = '';
    let filteredPosts = allPosts.filter(post => post.favorite);
    return filteredPosts;
  }
  let filteredPosts = allPosts.filter(post => filterSubject.includes(post.subject));
  if (favorite) {
    filteredPosts = filteredPosts.filter(post => post.favorite);
  }
  postContainer.innerHTML = '';
  return filteredPosts;
}

// Start site
loadLocalData();
