var fs = require("fs");
var Jimp = require("jimp");

var s3 = require("./s3");
var generateLinkToken = require("./generateLinkToken");
var connection = require("./database");

function uploadImage( file, type, user ) {
	var token = generateLinkToken();

	return Jimp.read( file )
			.then(image => {
				insertMedia( 1, type, token, token );
				return s3.upload( file, type, token );
			})
			.catch(err => {
				return err;
			});
}

function uploadFile( file, type, user ) {
	var token = generateLinkToken();
	insertMedia( 4, type, token, token );

	return s3.upload( file, type, token );
}

function insertMedia( typeId, contentType, slug, filename, content ) {
	connection.query(`
		insert uploaded_media (typeId, contentType, slug, filename, content)
		values (?, ?, ?, ?, ?)
	`, [ typeId, contentType, slug, filename, content ], err => {
		if( err ) {
			throw err;
		}
	});
}

module.exports = {
	uploadImage: uploadImage,
	uploadFile: uploadFile
};
