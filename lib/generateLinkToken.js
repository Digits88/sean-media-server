var crypto = require("crypto");
var Random = require("random-js");

module.exports = function generateLinkToken() {
	var engine = Random.engines.nativeMath;
	var distribution = Random.hex( false );

	return distribution( engine, 6 );
}
