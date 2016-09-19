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
Gallery.prototype.appendPictures = function(arr) {
  this.pictures = this.pictures.concat(arr);
};

Gallery.prototype.show = function(num) {
  galleryOverlayClose.onclick = this.hide;
  galleryOverlayImage.onclick = function() {
    if (this.activePicture < this.pictures.length) {
      this.activePicture++;
      this.setActivePicture(this.activePicture);
    } else {
      this.activePicture = 0;
      this.setActivePicture(this.activePicture);
    }
  }.bind(this);
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
