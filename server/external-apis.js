var jsonfile = require('jsonfile');

var externalApis = module.exports = {
  tumblr: {
    articles: {
      file: './content-cache/build-articles/articles-index.json',
      articleFilesDir: './content-cache/build-articles/articles/',
      buildArticlesIndex: function(data){
        
        var index = {
          articles: [],
          tags: []
        };

        for(var i = 0; i < data.length; i++){
          
          var item = data[i]; 

          if(item.type === 'text' || 'photo' || 'video'){  
            //create a main-field subset of each article object to use in the article listing
            var article = {
              title: item.title || item.caption || null,
              timestamp: item.timestamp,
              id: item.id,
              slug: item.slug,
              summary: item.summary,
              tags: item.tags
            };

            if(article.title !== null){
              index.articles.push(article);
            }
            
            //build a list of unique tags to be used in automcompletes etc
            for(var j = 0; j < item.tags.length; j++){
              if(index.tags.indexOf(item.tags[j]) === -1){
                index.tags.push(item.tags[j]);  
              }
            }

          }

        }

        return index;

      }
    }
  },
  flickr: {
    features: {
      timeOut: 1000 * 60 * 240, // four hours,
      lastUpdated: '',
      file: './content-cache/features.json'
    },
    gallery: {
      timeOut: 1000 * 60 * 90, // an hour and a half,
      lastUpdated: '',
      file: './content-cache/gallery.json'
    }
  },
  contentful: {
    pageWrapper: {
      file: './content-cache/page-wrapper.json'
    },
    homePage: {
      file: './content-cache/home-page.json'
    },
    boards: {
      file: './content-cache/board-versions/boards-index.json',
      boardFilesDir: './content-cache/board-versions/versions/'
    },
    mergeImages: function(){
      
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