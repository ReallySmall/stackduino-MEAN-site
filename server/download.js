var download = module.exports = {

  getFile: function(uri, filename, callback){

	  request.head(uri, function(err, res, body){



	    console.log('content-type:', res.headers['content-type']);
	    console.log('content-length:', res.headers['content-length']);

	    var r = request(uri).pipe(fs.createWriteStream(filename));
	    r.on('close', callback);

	  });

	}

};