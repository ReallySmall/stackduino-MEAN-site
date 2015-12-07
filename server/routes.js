/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

var bodyParser = require('body-parser');
var request = require("request");

var apis = require('./apis');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/boards', require('./api/board'));
  app.use('/api/settings', require('./api/setting'));
  app.use('/api/articles', require('./api/article'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  // route to proxy calls to Flickr api
  app.get('/api/flickr/:args', function(req, res){
    var query = apis.routes.flickr + '?api_key=' + apis.keys.flickr.api_key + req.params.args;
    console.log(query);
    request(query, function(error, response, body) {
      res.send(body);
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
