'use strict';

module.exports = function(adress, callback) {
  var scriptOnPage = document.createElement('script');
  scriptOnPage.src = adress + '?callback=jsonpCallback';

  window.jsonpCallback = function(data) {
    callback(data);
    document.body.removeChild(scriptOnPage);
    delete window.jsonpCallback;
  };
  document.body.appendChild(scriptOnPage);
};
