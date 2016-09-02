var connection = require("./database");

module.exports = function loadMedia( req, res, next ) {
	var slug = req.params.token.split(".")[0];

	connection.query(`select * from uploaded_media where slug = ?`, [ slug ], (err, result) => {
		if( err || !result.length ) {
			return res.send(404);
		}

		req.requestedMedia = result[0];
		incrementHits( req.requestedMedia.id );
		next();
	});
}

function incrementHits( id ) {
	connection.query(`update uploaded_media set hits = hits + 1 where id = ?`, [ id ]);
}
