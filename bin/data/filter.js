'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'filter-new':
      return list.sort(
        function(a, b) {
          return a.created - b.created;
        }
      );
    case 'filter-discussed':
      return list.sort(
        function(a, b) {
          return a.comments - b.comments;
        }
      );
    default:
      return list;
  }
};
