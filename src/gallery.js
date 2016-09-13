'use strict';

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
var galleryOverlayImage = document.querySelector('.gallery-overlay-image');

var Gallery = function() {
  this.pictures = null;
  this.activePicture = 0;
  this.galleryOverlay = galleryOverlay;
  this.galleryOverlayClose = galleryOverlayClose;
  this.galleryOverlayImage = galleryOverlayImage;
};

Gallery.prototype.setPictures = function(arr) {
  this.pictures = arr;
};
Gallery.prototype.show = function(num) {
  galleryOverlayClose.onclick = this.hide;
  var self = this;
  galleryOverlayImage.onclick = function() {
    if (self.activePicture < self.pictures.length) {
      self.activePicture++;
      self.setActivePicture(self.activePicture);
    } else {
      self.activePicture = 0;
      self.setActivePicture(self.activePicture);
    }
  };
  galleryOverlay.classList.remove('invisible');
  this.setActivePicture(num);
};
Gallery.prototype.hide = function() {
  galleryOverlay.classList.add('invisible');
  galleryOverlayClose.onclick = null;
  galleryOverlayImage.onclick = null;
};
Gallery.prototype.setActivePicture = function(num) {
  this.activePicture = num;
  this.galleryOverlayImage.src = this.pictures[this.activePicture].url;
  galleryOverlay.querySelector('.likes-count').textContent = this.pictures[this.activePicture].likes;
  galleryOverlay.querySelector('.comments-count').textContent = this.pictures[this.activePicture].comments;
};

module.exports = new Gallery();
