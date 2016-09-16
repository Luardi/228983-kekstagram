'use strict';


module.exports = function(url, params, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url +
  '?from=' + (params.from || 0) +
  '&to=' + (params.to || Infinity) +
  '&filter=' + (params.filter || 'filter-popular'));
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };
  xhr.send();
};
