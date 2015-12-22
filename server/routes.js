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
var cacheSettings = require('./cache-settings');
var externalApis = require('./external-apis');
var apicache = require('apicache').options({ debug: true }).middleware;
var jsonfile = require('jsonfile');
var util = require('util');

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

  // route to proxy calls to contentful api to get items of content type board
  app.get('/api/contentful/type/boards', function(req, res){

    if(new Date() - externalApis.contentful.boards.lastUpdated > externalApis.contentful.boards.timeOut){

      console.log('Contentful fetched from api');

      var query = apis.routes.contentful.boards;
      console.log(query);
      request(query, function(error, response, body) {
        externalApis.contentful.boards.lastUpdated = new Date();
        cacheSettings.writeFile(externalApis.contentful.boards.file, body);
        res.send(body);
      });

    } else {

      console.log('Contentful fetched from file cache');
      cacheSettings.readFile(cacheSettings.file.contentful.boards, res);

    }

  });

  // route to proxy calls to contentful api to get items by id
  app.get('/api/contentful/id/:args', function(req, res){
    var query = apis.routes.contentful.homepage;
    console.log(query);
    request(query, function(error, response, body) {
      res.send(body);
    });
  });

  // route to proxy calls to Flickr api for homepage features
  app.get('/api/flickr/features', function(req, res){

    if(new Date() - externalApis.flickr.features.lastUpdated > externalApis.flickr.features.timeOut){

    var query = apis.routes.flickr;
    query += '?api_key=' + apis.keys.flickr.api_key;
    query += '&method=flickr.photosets.getPhotos'
    query += '&photoset_id=72157626574230146';
    query += '&format=json&nojsoncallback=1&extras=tags,owner_name,url_n,url_o'
    console.log(query);
    request(query, function(error, response, body) {
      externalApis.flickr.features.lastUpdated = new Date();
      externalApis.writeFile(externalApis.flickr.features.file, body);
      res.send(body);
    });

    } else {

      console.log('Flickr features fetched from file cache');
      externalApis.readFile(externalApis.flickr.features.file, res);

    }

  });

  // route to proxy calls to Flickr api for gallery
  app.get('/api/flickr/gallery', function(req, res){

    if(new Date() - externalApis.flickr.gallery.lastUpdated > externalApis.flickr.gallery.timeOut){

      console.log('Flickr gallery fetching from api');
      var query = apis.routes.flickr;
      query += '?api_key=' + apis.keys.flickr.api_key;
      query += '&tags=photomacrography,-controller',
      query += '&format=json&nojsoncallback=1&per_page=150&page=1&method=flickr.photos.search&tag_mode=all&extras=tags,owner_name,url_n,url_o&safe_search=1'
      request(query, function(error, response, body) {
        console.log(body);
        //if(!response){
          externalApis.flickr.gallery.lastUpdated = new Date();
          externalApis.writeFile(externalApis.flickr.gallery.file, body);
          res.send(body);
        //} else {
          //console.log('Flickr gallery fetched from file cache - api request failed');
          //externalApis.readFile(externalApis.flickr.gallery.file, res);          
        //}
      });

    } else {

      console.log('Flickr gallery fetched from file cache');
      externalApis.readFile(externalApis.flickr.gallery.file, res);

    }

  });

  // route to proxy calls to Tumblr api
  app.get('/api/tumblr/:args', function(req, res){

    if(new Date() - cacheSettings.lastUpdated.tumblr.articles > cacheSettings.timeOut.tumblr.articles){

      console.log('Tumblr fetched from api');

      var blogTitle = req.params.args || 'reallysmall';

      TB.loadBlog(blogTitle).then(function(TB) {
        return TB.getPosts({
          amount: 1000
        }, {
          verbose: true
        });
      }).then(function(data) {
        if(!data){
          console.log('Tumblr - no data from api call - fetched from file cache');
          cacheSettings.readFile(cacheSettings.file.tumblr.articles, res);
        } else {
          cacheSettings.lastUpdated.tumblr.articles = new Date();
          cacheSettings.writeFile(cacheSettings.file.tumblr.articles, data);
          res.send(data);
        }
      });

    } else {

      console.log('Tumblr fetched from file cache');
      cacheSettings.readFile(cacheSettings.file.flickr.gallery, res);

    }

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
