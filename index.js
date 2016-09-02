var restify = require("restify");
var fs = require("fs");

var config = require("./config.json");
var verifyApiKey = require("./lib/verifyApiKey");
var mediaExists = require("./lib/mediaExists");
var mediaService = require("./lib/mediaService");
var s3 = require("./lib/s3");

var server = restify.createServer({
	name: config.site.name,
	version: "1.0.0"
});

server.use( restify.acceptParser( server.acceptable ) );
server.use( restify.queryParser() );
server.use( restify.bodyParser() );

server.get("/:token", mediaExists, function( req, res ) {
	res.header("Content-Type", req.requestedMedia.contentType );
	s3.getStream( req.requestedMedia.filename ).pipe( res );
});

server.post("/image", verifyApiKey, function( req, res ) {
	var file = fs.readFileSync( req.files.image.path );
	var type = req.files.image.type;

	mediaService.uploadImage( file, type, req.user )
		.then(token => res.send({ link: `${config.site.url}/${token}` }))
		.catch(err => res.send(err));
});

server.post("/file", verifyApiKey, function( req, res ) {
	var file = fs.readFileSync( req.files.file.path );
	var type = req.files.file.type;

	mediaService.uploadFile( file, type, req.user )
		.then(token => res.send({ link: `${config.site.url}/${token}` }))
		.catch(err => res.send(err));
});

server.listen(8080, function() {
	console.log(`${server.name} listening at ${server.url}`);
});
