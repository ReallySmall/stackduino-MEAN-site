/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

var bodyParser = require('body-parser');
var request = require("request");
var Tumburglar = require('tumburglar');
var apis = require('./apis');
var externalApis = require('./external-apis');
var apicache = require('apicache').options({ debug: true }).middleware;
var jsonfile = require('jsonfile');
var util = require('util');
var fs = require('fs');
var download = require('./download');

var TB = new Tumburglar({
    consumerKey: apis.keys.tumblr.consumer_key,
    consumerSecret: apis.keys.tumblr.secret_key
});

module.exports = function(app) {

app.use(bodyParser.json());

  // Insert routes below
  app.use('/api/boards', require('./api/board'));
  app.use('/api/settings', require('./api/setting'));
  app.use('/api/articles', require('./api/article'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  // route to proxy calls to contentful api to get settings file
  app.get('/api/content/settings', function(req, res){
    externalApis.readFile(externalApis.contentful.settings.file, res);
  });

  // route to proxy calls to contentful api to get settings file
  app.get('/api/content/settings/update', function(req, res){
      
      var query = '?access_token=' + apis.keys.contentful.api_key;
      query += '&content_type=settings';

      var requestOpts = {
        url: apis.routes.contentful + apis.keys.contentful.spaceId + "/entries" + query,
        method: "GET",
        gzip: true,
        timeout: 3000
      };

      request(requestOpts, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          externalApis.writeFile(externalApis.contentful.settings.file, body);
          res.send('{"status": "complete"}');
        }
      });

  });

  // route to proxy calls to contentful api to get items of content type board
  app.get('/api/content/boards/index', function(req, res){
    externalApis.readFile(externalApis.contentful.boards.file, res);
  });

  // route to return local copies of boards
  app.get('/api/content/boards/id/:id', function(req, res){

      console.log('Board fetched from file cache');
      var boardId = req.params.id
      externalApis.readFile(externalApis.contentful.boards.boardFilesDir + "/" + boardId + ".json", res);

  });

  // route to proxy calls to contentful api to get items of content type board
  app.get('/api/content/boards/update', function(req, res){

      var query = '?access_token=' + apis.keys.contentful.api_key;
      query += '&content_type=board';

      var requestOpts = {
        url: apis.routes.contentful + apis.keys.contentful.spaceId + "/entries" + query,
        method: "GET",
        gzip: true,
        timeout: 3000
      };

      request(requestOpts, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          
          var parsedBody = JSON.parse(body);

          var data = parsedBody.items;
          var assets = parsedBody.includes.Asset;

          var index = {
            boards: [],
            assets: []
          };

          for(var i = 0; i < data.length; i++){

            //create an abridged object for index page for each board
            var indexBoard = {
              version: data[i].fields.version,
              title: data[i].fields.title,
              status: data[i].fields.status,
              introduction: data[i].fields.introduction,
              images: data[i].fields.images || []
            };

            index.boards.push(indexBoard);
            index.assets = assets;

            var board = {
              content: data[i],
              assets: assets
            }

            fs.writeFile(externalApis.contentful.boards.boardFilesDir + "/" + indexBoard.version + ".json", JSON.stringify(board), function(err) {
              if(err) {
                return console.log(err);
              }
              console.log("The file was saved!");
            });

          }

          externalApis.writeFile(externalApis.contentful.boards.file, index);

          res.send({"Status": "Complete"});
            
        }
          

      });

  });

  // route to proxy calls to contentful api to get items of content type board
  app.get('/api/content/homepage', function(req, res){
      externalApis.readFile(externalApis.contentful.homePage.file, res);
  });

  // route to proxy calls to contentful api to get items of content type board
  app.get('/api/content/homepage/update', function(req, res){

      var query = '?access_token=' + apis.keys.contentful.api_key;
      query += '&content_type=homepage';

      var requestOpts = {
        url: apis.routes.contentful + apis.keys.contentful.spaceId + "/entries" + query,
        method: "GET",
        gzip: true,
        timeout: 3000
      };

      request(requestOpts, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          externalApis.writeFile(externalApis.contentful.homePage.file, body);
          res.send('{"status": "complete"}');
        }
      });

  });

  // route to proxy calls to Flickr api for homepage features
  app.get('/api/content/features', function(req, res){

    if(new Date() - externalApis.flickr.features.lastUpdated > externalApis.flickr.features.timeOut){

      console.log('Flickr gallery fetching from api');
      var query = '?api_key=' + apis.keys.flickr.api_key;
      query += '&method=flickr.photosets.getPhotos'
      query += '&photoset_id=72157632341602394';
      query += '&format=json&nojsoncallback=1&extras=tags,owner_name,url_n,url_o'

      var requestOpts = {
        url: apis.routes.flickr + query,
        method: "GET",
        gzip: true,
        timeout: 3000
      };

      request(requestOpts, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          externalApis.flickr.features.lastUpdated = new Date();
          externalApis.writeFile(externalApis.flickr.features.file, body);
          res.send(body);
        } else {
          console.log(error);
          console.log('Flickr features fetched from file cache - api request failed');
          externalApis.readFile(externalApis.flickr.features.file, res);          
        }
      });

    } else {

      console.log('Flickr features fetched from file cache');
      externalApis.readFile(externalApis.flickr.features.file, res);

    }

  });

  // route to proxy calls to Flickr api for gallery
  app.get('/api/content/gallery', function(req, res){

    if(new Date() - externalApis.flickr.gallery.lastUpdated > externalApis.flickr.gallery.timeOut){

      console.log('Flickr gallery fetching from api');
      var query = '?api_key=' + apis.keys.flickr.api_key;
      query += '&tags=stackduino,-controller',
      query += '&format=json&nojsoncallback=1&per_page=150&page=1&method=flickr.photos.search&tag_mode=all&extras=tags,owner_name,url_n,url_o&safe_search=1'

      var requestOpts = {
        url: apis.routes.flickr + query,
        method: "GET",
        gzip: true,
        timeout: 3000
      };

      request(requestOpts, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          externalApis.flickr.gallery.lastUpdated = new Date();
          externalApis.writeFile(externalApis.flickr.gallery.file, body);
          res.send(body);
        } else {
          console.log(error);
          console.log('Flickr gallery fetched from file cache - api request failed');
          externalApis.readFile(externalApis.flickr.gallery.file, res);          
        }
      });

    } else {

      console.log('Flickr gallery fetched from file cache');
      externalApis.readFile(externalApis.flickr.gallery.file, res);

    }

  });

  // route to return local index of Tumblr posts
  app.get('/api/content/articles/index', function(req, res){

      console.log('Tumblr index fetched from file cache');
      externalApis.readFile(externalApis.tumblr.articles.file, res);

  });

  // route to return local copies of Tumblr posts
  app.get('/api/content/articles/id/:id', function(req, res){

      console.log('Tumblr article fetched from file cache');
      var articleId = req.params.id
      externalApis.readFile(externalApis.tumblr.articles.articleFilesDir + "/" + articleId + ".json", res);

  });

  // route to update local copies of Tumblr posts
  app.get('/api/content/articles/update', function(req, res){

      console.log('Tumblr articles file cache update...');

      TB.loadBlog('reallysmall').then(function(TB) { //using tumburglar to fetch all posts
        return TB.getPosts({
          amount: 1000
        });
      }).then(function(data) {
        //create an article index file
        var indexData = externalApis.tumblr.articles.buildArticlesIndex(data);
        externalApis.writeFile(externalApis.tumblr.articles.file, indexData);
        //then create a file for each article
        for(var i = 0; i < data.length; i++){
          var articleId = data[i].id;

          var image = data[i].image_permalink;
          if(image){
            //download.getFile(image, 'image.jpg', function(){
              //console.log(image);
            //});
          }

          fs.writeFile(externalApis.tumblr.articles.articleFilesDir + "/" + articleId + ".json", JSON.stringify(data[i]), function(err) {
            if(err) {
              return console.log(err);
            }
            console.log("The file was saved!");
          }); 
        }
        res.send('{"status": "complete"}');
      });

  });

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
