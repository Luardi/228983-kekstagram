'use strict';

var makeRequest = require('./load');
var Picture = require('./picture');
var newGallery = require('./gallery');

var pageNumber = 0;
var pageSize = 12;
var THROTTLE_TIMEOUT = 100;
var GAP = 100;
var activeFilter = 'filter-popular';

var footer = document.querySelector('footer');
var filtersBlock = document.querySelector('.filters');
var container = document.querySelector('.pictures');
filtersBlock.classList.add('hidden');


var loadDataWithParam = function(currentPageNumber, filter) {
  var params = {
    from: currentPageNumber * pageSize,
    to: currentPageNumber * pageSize + pageSize,
    filter: filter
  };
  makeRequest('http://localhost:1506/api/pictures', params, function(data) {
    var pictures = data;
    pictures.forEach(function(picture, i) {
      var newPicture = new Picture(picture, i);
      container.appendChild(newPicture.element);
    });
    filtersBlock.classList.remove('hidden');
    newGallery.setPictures(pictures);
  });
};

loadDataWithParam(pageNumber, activeFilter);

var changeFilter = function(filterID) {
  container.innerHTML = '';
  activeFilter = filterID;
  pageNumber = 0;
  loadDataWithParam(pageNumber, activeFilter);
};

filtersBlock.addEventListener('change', function(evt) {
  changeFilter(evt.target.id);
}, false);


var lastCall = Date.now();

window.addEventListener('scroll', function() {
  if (Date.now - lastCall >= THROTTLE_TIMEOUT) {
    if (footer.getBoundingClientRect().bottom - window.innerHeight <= GAP) {
      loadDataWithParam(pageNumber++, activeFilter);
    }
    lastCall = Date.now();
  }
});
