'use strict';

var makeJSONPRequest = function(adress, callback) {
  var scriptOnPage = document.createElement('script');
  scriptOnPage.src = adress + '?callback=jsonpCallback';

  window.jsonpCallback = function(data) {
    callback(data);
    document.body.removeChild(scriptOnPage);
    delete window.jsonpCallback;
  };
  document.body.appendChild(scriptOnPage);
};

makeJSONPRequest('http://localhost:1506/api/pictures', function(data) {
  window.pictures = data;
  window.pictures.forEach(function(picture) {
    container.appendChild(getPictureElement(picture));
  });
});


var filtersBlock = document.querySelector('.filters');
var container = document.querySelector('.pictures');
var template = document.querySelector('template');
var templateContainer = 'content' in template ? template.content : template;

var IMAGE_LOAD_TIMEOUT = 10000;

filtersBlock.classList.add('hidden');


var getPictureElement = function(picture) {
  var pictureElement = templateContainer.querySelector('.picture').cloneNode(true);
  var pictureInTemplate = document.querySelector('template img');
  pictureElement.querySelector('.picture-comments').textContent = picture.comments;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;

  var newImage = new Image(182, 182);
  var newImageTimeout = null;

  newImage.onload = function() {
    clearTimeout(newImageTimeout);
    pictureInTemplate.src = newImage.src;
  };

  newImage.onerror = function() {
    pictureElement.classList.add('picture-load-failure');
  };

  newImage.src = picture.url;

  newImageTimeout = setTimeout(function() {
    pictureElement.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  filtersBlock.classList.remove('hidden');

  return pictureElement;
};
