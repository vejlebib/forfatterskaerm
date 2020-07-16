"use strict";

var authors = require('config/authors.json').authors;
var author_list_tmpl = require('views/list');
var author_list = author_list_tmpl({authors: authors});

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
    var author = getAuthor(params.id);
    displayAuthor(author);
  },
  '/random': function() {
    var random_author = authors[Math.floor(Math.random() * authors.length)];
    displayAuthor(random_author);
  },
  '/random/:authors': function(params) {
    var authors = params.authors.split(',').map(author => author.trim());
    var random_author = authors[Math.floor(Math.random() * authors.length)];
    // In this case it's only a string passed in the URL. We need to load the
    // author object as displayAuthor expects.
    random_author = getAuthor(random_author);
    displayAuthor(random_author);
  }
}).resolve();

function getBaseURL() {
  return window.location.protocol + '//' + window.location.hostname;
}

function getAuthor(name) {
  for (let author of authors) {
    if (author.name === name) {
      return author;
    }
  }
  return false;
}

function displayAuthor(author) {
  $('#main-view').html(video_tmpl({author: author}));

  $('#close-video').on('click touch', function(e) {
    e.preventDefault();
    router.navigate('/');
  })

  author_video.startAuthorVideo(author);
}
