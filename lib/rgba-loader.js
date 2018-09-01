var loaderUtils = require('loader-utils');
var Rgba = require('./rgbaFactory.js');


module.exports = function(source){

	var options = loaderUtils.getOptions(this);

	var rgba = new Rgba(options);

	return rgba.toHex16(source);
}