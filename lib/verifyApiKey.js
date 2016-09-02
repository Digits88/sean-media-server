var connection = require("./database");

module.exports = function verifyApiKey( req, res, next ) {
	if( !req.headers.authorization ) {
		return res.send(401);
	}

	var apiKey = req.headers.authorization;

	connection.query(`
		select id
		from users
		where apiKey = ?
	`, [ apiKey ], (err, user) => {

		if( err ) {
			console.error(err);
			return res.send(401);
		}

		if( !user.length ) {
			return res.send(401);
		}

		req.user = user[0].id;

		next();
	});
}
