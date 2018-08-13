define([
    "skylark-langx/langx",
    "skylark-utils/query",
    "./layouts",
    "./Orientation"
], function(langx, $, layouts, Orientation) {
    // TODO : This module will be deleted.
    var box = layouts.box = function(container,options) {
        var options = langx.mixin({
            items : ".item", // children element selector for item
            wspacing : 100, // width for spacing a child element
            hspacing : 100, // height for spacing a child element
            orientation : Orientation.vert // Laid out elements direction,
        },options)


        var size = $(container).clientSize(),
            width = size.width,
            height = size.height,
            x = 0, 
            y = 0;
            
        var $items = $(container).children(options.items);        

        $items.each(function(i){
            // layouts inited item child
            $(this).css({
                "left" : x,
                "top" : y,
                "position" : "absolute",
                "display" : "inline-block"
            });

            // 垂直排列
            if (options.orientation == Orientation.vert) {
                y += options.hspacing;
                if (y >= (height - options.hspacing)) {
                    y = 0; 
                    x += options.wspacing;
                }
            } else {
                x += options.wspacing;
                if (x >= (width - options.wspacing)) {
                    x = 0; 
                    y += options.hspacing;
                }
            }

        });
    };
    
    return box;        
    
});
