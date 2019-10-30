define([
    "skylark-langx/langx",
    "skylark-domx-data",
    "skylark-domx-finder",
    "skylark-domx-geom",
    "./layouts",
	"./DockStyle",
], function(langx,datax,finder,geom,layouts,geom,DockStyle) {

    var dock = layouts.dock = function(container,options) {
        var options = langx.mixin({
            items : "[data-region]" // children element selector for item
        },options)       

        var size = geom.clientSize(container),
        	dim = {
        		l : 0,
        		t : 0,
        		w : size.width,
        		h : size.height,
        	},
        	children = finder.children(container,options.items);

		children = children.filter(function(item){ return datax.data(item,"region") != "client"; })
			.concat(children.filter(function(item){ return datax.data(item,"region") == "client"; }));

		// set positions/sizes
		children.forEach(function(item){
			var region = datax.data(item,"region"),
			    childSize = geom.size(item);

			if(!region){
				throw new Error("No dock setting for " + item.id)
			}

			// set elem to upper left corner of unused space; may move it later

			styler.css(elm,{
				position : "absolute"
			});

			// Size adjustments to make to this child widget
			var bounds = {
				left : dim.l,
				top : dim.t
			};

			// set size && adjust record of remaining space.
			// note that setting the width of a <div> may affect its height.
			if(region == "top" || region == "bottom"){
				bounds.width = dim.w;
				dim.h -= childSize.height;
				if("region" == "top"){
					dim.t += childSize.height;
				}else{
					bounds.top = dim.t + dim.h;
				}
			}else if(region == "left" || region == "right"){
				bounds.height = dim.h;
				dim.w -= childSize.width;
				if(pos == "left"){
					dim.l += childSize.width;
				}else{
					bounds.left = dim.l + dim.w;
				}
			}else if(region == "client"){
				bounds.width = dim.w;
				bounds.height = dim.h;
			}

			geom.relativeRect(item,bounds);
		});


    };
    
    return dock;    

});
