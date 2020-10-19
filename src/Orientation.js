define([
    "skylark-langx/langx",
    "./layouts"
], function(langx,layouts) {

    var Orientation = layouts.Orientation = {
    	"Horizontal" : 1, 
    	"Vertical" : 2
    };
    return Orientation;
});
