'use strict';

var makeJSONPRequest = require('./load');

var filtersBlock = document.querySelector('.filters');
filtersBlock.classList.add('hidden');

makeJSONPRequest('http://localhost:1506/api/pictures', function(data) {
  var container = document.querySelector('.pictures');
  window.pictures = data;
  window.pictures.forEach(function(picture, i) {
    container.appendChild(getPictureElement(picture, i));
  });
  filtersBlock.classList.remove('hidden');
});

var getPictureElement = require('./picture');

var newGallery = require('./gallery');
newGallery.setPictures('http://localhost:1506/api/pictures');
