'use strict';


module.exports = function(url, params, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url +
  '?from' + (params.from || 0) +
  '&to' + (params.to || Infinity) +
  '&filter' + (params.filter || 'default'));
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };
  xhr.send();
};

/* module.exports = function(adress, callback) {
  var scriptOnPage = document.createElement('script');
  scriptOnPage.src = adress + '?callback=jsonpCallback';

  window.jsonpCallback = function(data) {
    callback(data);
    document.body.removeChild(scriptOnPage);
    delete window.jsonpCallback;
  };
  document.body.appendChild(scriptOnPage);
};
*/
