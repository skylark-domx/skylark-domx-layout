define([
    "skylark-langx/langx",
    "./layouts",
],function(langx,layouts) {

	var DockStyle = layouts.DockStyle = {
		"None" : 1, 
		"Left" : 2, 
		"Top" : 3, 
		"Right" : 4, 
		"Bottom" : 5, 
		"Client" : 6
	};

	return DockStyle;

});
