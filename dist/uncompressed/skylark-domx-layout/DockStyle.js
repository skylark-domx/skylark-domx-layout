define([
    "skylark-langx/langx",
    "./layouts",
],function(langx,layouts) {

	var DockStyle = layouts.DockStyle = {
		"none" : 1, 
		"left" : 2, 
		"top" : 3, 
		"right" : 4, 
		"bottom" : 5, 
		"client" : 6
	};

	return DockStyle;

});
