var AWS = require("aws-sdk");
var config = require("../config.json");

AWS.config.update({ accessKeyId: config.s3.accessKey, secretAccessKey: config.s3.secretKey });

var s3 = new AWS.S3({ region: "us-east-1" });

function upload( file, type, token ) {
	return new Promise((resolve, reject) => {

		s3.upload({
			Bucket: config.s3.bucket,
			Key: token,
			Body: file,
			ContentType: type,
			ACL: "public-read"
		}, err => {
			if( err ) {
				return reject( err );
			}

			return resolve( token );
		});

	});
}

function getStream( token ) {
	return s3.getObject({
		Bucket: config.s3.bucket,
		Key: token
	}).createReadStream();
}

module.exports = {
	upload: upload,
	getStream: getStream
};
