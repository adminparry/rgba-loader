var css = require('css');
var extend = require('extend');
var rgbaRegExp = /\brgba?\(((\d|[1-9]\d|[1-2][0-5][0-5]),){2}(\d|[1-9]\d|[1-2][0-5][0-5])\)$/;
// ignore for Lowercase RGBA
var defaultConfig = {

}
function Rgba(options){
	this.config = {};
	extend(this.config, defaultConfig, options);

}
function cssInspector(cssText){
	var astObj = css.parse(cssText);
	
	var rules = astObj.stylesheet.rules;
	
	for (var i = 0; i < rules.length; i++) {
		var ruleItem = rules[i];
		var declarations = ruleItem.declarations;


		if (ruleItem.type === 'media') {
	        cssInspector(ruleItem.rules); // recursive invocation while dealing with media queries
	        continue;
        } else if (ruleItem.type === 'keyframes') {
	        cssInspector(ruleItem.keyframes); // recursive invocation while dealing with keyframes
	        continue;
        } else if (ruleItem.type !== 'rule' && ruleItem.type !== 'keyframe') {
	        continue;
        }


		for (var j = 0; j < declarations.length; j++) {

			var declarationItem = declarations[j];

			var isHit = declarationItem.type === 'declaration' && rgbaRegExp.test(declarationItem.value);
			console.log(declarationItem.value,'+================================================')
			if (isHit) {

				declarationItem.value = Rgba.prototype.rgb2hex(declarationItem.value)
			}
		};
	};

	return css.stringify(astObj);
}
Rgba.prototype.toHex16 = function(cssStr){
	var self = this;

	return cssInspector(cssStr);
}
Rgba.prototype.rgb2hex = function(color){
	var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
 
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}
module.exports = Rgba;