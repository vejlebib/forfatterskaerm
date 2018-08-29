// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
      'app.js': /^app/
    }
  },
  stylesheets: {joinTo: {
      'app.css': /^app/
    }
  },
  templates: { joinTo: 'app.js' }
};

exports.npm = {
  globals: {
    $: 'jquery',
    jQuery: 'jquery'
  }
}

exports.plugins = {
  babel: {presets: ['latest']},
  sass: {
    options: {
      includePaths: ['./node_modules/bootstrap/scss'],
      precision: 8
    }
  }
};
