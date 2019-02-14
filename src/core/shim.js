global.requestAnimationFrame = callback => setTimeout(callback, 0);

global.cancelAnimationFrame = requestID => {
  /* not empty block */
};

import Audio from "mock-audio-element";

// Do not load the audio file trough http
Audio.prototype.load = function() {
  this.duration = 1000 * 60 * 3;
};
Audio.prototype.play = function() {
  var currentTime = 0;
  this.paused = false;
  this.currentTime = currentTime + 1;
};
Audio.prototype.pause = function() {
  this.paused = true;
};

global.Audio = Audio;
