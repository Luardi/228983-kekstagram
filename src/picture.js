'use strict';

var newGallery = require('./gallery');
var template = document.querySelector('template');
var templateContainer = 'content' in template ? template.content : template;

var IMAGE_LOAD_TIMEOUT = 10000;

var getPictureElement = function(picture, i) {
  var pictureElement = templateContainer.querySelector('.picture').cloneNode(true);
  var pictureInTemplate = pictureElement.querySelector('img');
  pictureElement.querySelector('.picture-comments').textContent = picture.comments;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;

  var newImage = new Image(182, 182);
  var newImageTimeout = null;

  newImage.onload = function() {
    clearTimeout(newImageTimeout);
    pictureElement.replaceChild(newImage, pictureInTemplate);
  };

  newImage.onerror = function() {
    pictureElement.classList.add('picture-load-failure');
  };

  newImage.onclick = function() {
    newGallery.show(i);
    newGallery.setActivePicture(i);
  };

  newImage.src = picture.url;

  newImageTimeout = setTimeout(function() {
    pictureElement.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return pictureElement;
};

module.exports = getPictureElement;
