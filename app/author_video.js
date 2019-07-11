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

    // If the click wasn't on a button in the video, we have nothing to do here.
    if (!button) {
      return;
    }

    // The back button was clicked while loop was playing; Go back to loop.
    if (button.id === 'back' && !loopPlaying) {
      playLoop(this, author);
    }
    // An answer button was clicked and we will only respond to these while
    // loop is playing.
    else if (button.id !== 'back' && loopPlaying) {
      playAnswer(this, author, button);
    }
  });

  // The background in author videos is not completely black and varies
  // slightly. To ahcieve the best result it's therefore configured for each
  // author and set dynamically here.
  $('.author-video-wrapper').css('background-color', author.background_color);

  // Prevents download of video with a right click. The video is still easy to
  // download, but this should prevent some. This could be combined with other
  // solution to make it harder.
  // See: https://stackoverflow.com/a/9756909
  video.on('contextmenu', function() {
    return false;
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
  video.src = '/forfattere/' + author.name + '/loop.mp4';
  video.loop = true;
  video.muted = true;
  video.load();
  video.play();
  loopPlaying = true;
}

function playAnswer(video, author, button) {
  video.src = '/forfattere/' + author.name + '/' + button.id + '.mp4';
  video.loop = false;
  video.muted = false;
  video.load();
  video.play();
  loopPlaying = false;
}
