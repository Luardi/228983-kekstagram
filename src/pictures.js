'use strict';

var makeJSONPRequest = require('./load');

var filtersBlock = document.querySelector('.filters');
filtersBlock.classList.add('hidden');

makeJSONPRequest('http://localhost:1506/api/pictures', function(data) {
  var container = document.querySelector('.pictures');
  var pictures = data;
  pictures.forEach(function(picture, i) {
    container.appendChild(new GetPictureElement(picture, i));
  });
  filtersBlock.classList.remove('hidden');
  newGallery.setPictures(pictures);
});

var GetPictureElement = require('./picture');

var newGallery = require('./gallery');
