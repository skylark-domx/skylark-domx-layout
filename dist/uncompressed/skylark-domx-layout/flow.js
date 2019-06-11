define([
    "skylark-langx/langx",
    "skylark-utils-dom/query",
    "./layouts",
], function(langx,$,layouts) {
    // summary:
    //  The flow layouter is a layout manager that adds items to the right sequentially from the left. 
    //  If it can not be added to the right side, it will be added back to the left one position to the left.
    //  It does not change the size of the item added as a big feature of the flow layouter at all. 
    //  Therefore, it is placed as it is with the recommended size that the added item has or the explicitly specified size.

    var flow = layouts.flow = function(container,options) {
        var options = langx.mixin({
            items : ".item" // children element selector for item
        },options)       
        var $items = $(container).children(options.items);        
        $items.css({
            "left" : "0px",
            "top" : "0px",
            "position" : "relative",
            "display" : "inline-block"
        });
    };
    
    return flow;
    
});
