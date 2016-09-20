'use strict';

var makeRequest = require('./load');
var Picture = require('./picture');
var newGallery = require('./gallery');

var pageNumber = 0;

var pageSize = 12;
var THROTTLE_TIMEOUT = 100;
var GAP = 100;
var activeFilter = 'filter-popular';

var throttle = function(func, thottleTimeout) {
  var state = null;
  var stop = 1;
  return function() {
    if (state) {
      return;
    }
    func.apply(this, arguments);
    state = stop;
    setTimeout(function() {
      state = null;
    }, thottleTimeout);
  };
};

var needToLoad = function() {
  return (footer.getBoundingClientRect().bottom - window.innerHeight <= GAP);
};

var footer = document.querySelector('footer');
var filtersBlock = document.querySelector('.filters');
var container = document.querySelector('.pictures');
filtersBlock.classList.add('hidden');

var loadDataWithParam = function(filter, force) {
  if(!force && !needToLoad()) {
    return;
  }

  var params = {
    from: pageNumber * pageSize,
    to: pageNumber * pageSize + pageSize,
    filter: filter
  };

  var offset = newGallery.pictures.length;

  makeRequest('http://localhost:1506/api/pictures', params, function(data) {
    var pictures = data;
    pictures.forEach(function(picture, i) {
      var newPicture = new Picture(picture, i + offset);
      container.appendChild(newPicture.element);
    });
    filtersBlock.classList.remove('hidden');
    newGallery.appendPictures(pictures);
    if (needToLoad()) {
      ++pageNumber;
      loadDataWithParam(activeFilter);
    }
  });
};

var changeFilter = function(filterID) {
  container.innerHTML = '';
  activeFilter = filterID;
  localStorage.setItem('filter', activeFilter);
  pageNumber = 0;
  filtersBlock.classList.add('hidden');
  newGallery.setPictures([]);
  loadDataWithParam(activeFilter);
};

var newFilter = localStorage.getItem('filter');
if (newFilter) {
  activeFilter = newFilter;
  document.getElementById(activeFilter).checked = true;
}

newGallery.setPictures([]);
loadDataWithParam(activeFilter, true);

filtersBlock.addEventListener('change', function(evt) {
  changeFilter(evt.target.id);
}, false);

var throttledFunction = throttle(function() {
  console.log('scroll');
  if (needToLoad()) {
    ++pageNumber;
    loadDataWithParam(activeFilter);
  } }, THROTTLE_TIMEOUT);

window.addEventListener('scroll', throttledFunction);
