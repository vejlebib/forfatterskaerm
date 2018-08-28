/**
 * Handles starting and disposal of author videos.
 */

"use strict";

var buttons = require('config/buttons.json').buttons;
var loopPlaying = false;

exports.startAuthorVideo = function (author) {
  // Author video template starts with the loop attribute.
  loopPlaying = true;
  var video = $('#author-video');

  video.on('ended', function() {
    if (!loopPlaying) {
      playLoop(this, author);
    }
  });

  // Attach a click handler which works with the current selected author.
  video.on('click touch', function(e) {
    var coordinates = getPercentageCoordinates(this, e.clientX, e.clientY);
    var button = getClickedButton(coordinates.x, coordinates.y);
    if (button.id === 'back' && !loopPlaying) {
      playLoop(this, author);
    }
    else if (button && button.id !== 'back' && loopPlaying) {
      playAnswer(this, author, button);
    }
  });
}

function getClickedButton(xPercentage, yPercentage) {
  for (let button of buttons) {
    if (xPercentage > button.x_min && xPercentage < button.x_max && yPercentage > button.y_min && yPercentage < button.y_max) {
      return button;
    }
  }
  return false;
}

function getPercentageCoordinates(video, x, y) {
  var padding = ($(window).width() - $(video).width()) / 2;
  return {
    x: Math.max(x - padding, 0) / $(video).width(),
    y: y / $(window).height()
  };
}

function playLoop(video, author) {
  video.src = '/forfattere/' + author + '/loop.mp4';
  video.loop = true;
  video.load();
  video.play();
  loopPlaying = true;
}

function playAnswer(video, author, button) {
  video.src = '/forfattere/' + author + '/' + button.id + '.mp4';
  video.loop = false;
  video.load();
  video.play();
  loopPlaying = false;
}
