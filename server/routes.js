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

    if(new Date() - cacheSettings.lastUpdated.contentful.boards > cacheSettings.timeOut.contentful.boards){

      console.log('Contentful fetched from api');

      var query = apis.routes.contentful.boards;
      console.log(query);
      request(query, function(error, response, body) {
        cacheSettings.lastUpdated.contentful.boards = new Date();
        cacheSettings.writeFile(cacheSettings.file.contentful.boards, body);
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

  // route to proxy calls to Flickr api
  app.get('/api/flickr/:args', function(req, res){
    var query = apis.routes.flickr + '?api_key=' + apis.keys.flickr.api_key + req.params.args;
    console.log(query);
    request(query, function(error, response, body) {
      res.send(body);
    });
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
      cacheSettings.readFile(cacheSettings.file.tumblr.articles, res);
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
