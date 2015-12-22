var jsonfile = require('jsonfile');

var cacheSettings = module.exports = {
  timeOut : {
    tumblr: {
      articles: 1000 * 60 * 60, // an hour
    },
    flickr: {
      gallery: 1000 * 60 * 90, // an hour and a half
      features: 1000 * 60 * 240 // four hours
    },
    contentful: {
      pageWrapper: 1000 * 60 * 300, // five hours
      homePage: 1000 * 60 * 120, // two hours
      boards: 1000 * 60 * 120 // two hours
    }
  },
  lastUpdated: {
    tumblr: {
      articles: ''
    },
    flickr: {
      gallery: '',
      features: ''
    },    
    contentful: {
      pageWrapper: '',
      homePage: '',
      boards: ''
    }
  },
  file: {
    tumblr: {
      articles: './content-cache/tumblr-reallysmall.json'
    },
    flickr: {
      gallery: './content-cache/flickr-reallysmall-gallery.json',
      features: './content-cache/flickr-reallysmall-features.json' 
    },
    contentful: {
      pageWrapper: './content-cache/contentful-page-wrapper.json',
      homePage: './content-cache/contentful-home-page.json',
      boards: './content-cache/contentful-boards.json'
    }

  },
  readFile: function(file, res){
    console.log(file);
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