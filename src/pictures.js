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
});
