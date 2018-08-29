"use strict";

var authors = require('config/authors.json');
var author_list_tmpl = require('views/list');
var author_list = author_list_tmpl({authors: authors.authors});

var video_tmpl = require('views/video');

var router = new (require('navigo'))(getBaseURL());
const author_video = require('author_video');

// Setup some simple routing in the client with javascript.
router.on({
  '/': function() {
    $('#main-view').html(author_list);

    $('#author-list a').click(function(e) {
      e.preventDefault();
      router.navigate(getBaseURL() + '/forfatter/' + $(this).data('name'), true);
    });
  },
  '/forfatter/:id': function(params) {
    $('#main-view').html(video_tmpl({author: params.id}));

    $('#close-video').on('click touch', function(e) {
      e.preventDefault();
      router.navigate('/');
    })

    author_video.startAuthorVideo(params.id);
  }
}).resolve();

function getBaseURL() {
  return window.location.protocol + '//' + window.location.hostname;
}
