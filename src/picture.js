'use strict';

var newGallery = require('./gallery');
var template = document.querySelector('template');
var templateContainer = 'content' in template ? template.content : template;

var IMAGE_LOAD_TIMEOUT = 10000;

var Picture = module.exports = function(picture, i) {
  this.data = picture;
  this.index = i;

  return this.createPictureElement(picture);
};


Picture.prototype.createPictureElement = function(picture) {
  this.element = templateContainer.querySelector('.picture').cloneNode(true);
  var pictureInTemplate = this.element.querySelector('img');
  this.comments = this.element.querySelector('.picture-comments');
  this.comments.textContent = picture.comments;
  this.likes = this.element.querySelector('.picture-likes');
  this.likes.textContent = picture.likes;

  this.image = new Image(182, 182);
  var newImageTimeout = null;

  this.image.onload = function() {
    clearTimeout(newImageTimeout);
    this.element.replaceChild(this.image, pictureInTemplate);
  }.bind(this);

  this.image.onerror = function() {
    this.element.classList.add('picture-load-failure');
  }.bind(this);

  this.image.onclick = this.onImageClick.bind(this);

  this.image.src = picture.url;

  newImageTimeout = setTimeout(function() {
    this.element.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return this.element;
};

Picture.prototype.onImageClick = function(event) {
  event.preventDefault();
  newGallery.show(this.index);
};

Picture.prototype.remove = function() {
  this.image.onclick = null;
};
