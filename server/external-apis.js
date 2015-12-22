var jsonfile = require('jsonfile');

var externalApis = module.exports = {
  tumblr: {
    articles: {
      timeOut: 1000 * 60 * 60, // an hour,
      lastUpdated: '',
      file: './content-cache/tumblr-reallysmall.json'
    }
  },
  flickr: {
    features: {
      timeOut: 1000 * 60 * 240, // four hours,
      lastUpdated: '',
      file: './content-cache/flickr-reallysmall-features.json'
    },
    gallery: {
      timeOut: 1000 * 60 * 90, // an hour and a half,
      lastUpdated: '',
      file: './content-cache/flickr-reallysmall-gallery.json'
    }
  },
  contentful: {
    pageWrapper: {
      timeOut: 1000 * 60 * 360, // six hours,
      lastUpdated: '',
      file: './content-cache/flickr-contentful-page-wrapper.json'
    },
    homePage: {
      timeOut: 1000 * 60 * 120, // two hours,
      lastUpdated: '',
      file: './content-cache/flickr-contentful-home-page.json'
    },
    boards: {
      timeOut: 1000 * 60 * 120, // two hours,
      lastUpdated: '',
      file: './content-cache/flickr-contentful-boards.json'
    }
  },
  readFile: function(file, res){
    jsonfile.readFile(file, function(err, obj) {
      res.send(obj);
    });
  },
  writeFile: function(file, obj){
    jsonfile.writeFile(file, obj, function (err) {
      console.error(err)
    });
  }
}