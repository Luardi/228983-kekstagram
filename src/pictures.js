'use strict';

var makeJSONPRequest = require('./load');
var Picture = require('./picture');
var newGallery = require('./gallery');

var filtersBlock = document.querySelector('.filters');
filtersBlock.classList.add('hidden');

makeJSONPRequest('http://localhost:1506/api/pictures', function(data) {
  var container = document.querySelector('.pictures');
  var pictures = data;
  pictures.forEach(function(picture, i) {
    var newPicture = new Picture(picture, i);
    container.appendChild(newPicture.element);
  });
  filtersBlock.classList.remove('hidden');
  newGallery.setPictures(pictures);
});
