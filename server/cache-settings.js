var jsonfile = require('jsonfile');

var cacheSettings = module.exports = {
  timeOut : {
    tumblr: {
      articles: 1000 * 60 * 60, // an hour
    },
    flickr: 1000 * 60 * 30, // half an hour
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
    flickr: '',
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
    flickr: './content-cache/flickr-reallysmall.json',
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