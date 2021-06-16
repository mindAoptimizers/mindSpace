'use strict';

// Global variabls
const filterSubject = [];


// JS to HTML links
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const modalCancelButton = document.querySelector('.modal__action--negative');
const addPostButton = document.querySelector('.header-nav__item--cta');

// Set event listeners for backdrop & modal
addPostButton.addEventListener('click', function() {
  modal.classList.add('open');
  backdrop.classList.add('open');
});

modalCancelButton.addEventListener('click', function() {
  modal.classList.remove('open');
  backdrop.classList.remove('open');
});

// Constructor for Product
// function Post(name, image) {
//   this.name = name;
//   this.displayImage = image;
//   this.clickCount = 0;
//   this.showCount = 0;
//   allProducts.push(this);
// }

// Extend string object add method to capitalize first letter
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Functions

// Start site
