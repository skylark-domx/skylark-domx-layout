define([
    "skylark-langx/langx",
    "skylark-utils-dom/query",
    "./layouts",
], function(langx,$,layouts) {
    // summary:
    //  The bsgrid layouter is a layout manager that adds each child item to a separate column. 

    var columns = layouts.columns = function(container,options) {
        var options = langx.mixin({
            items : ".item" // children element selector for item
        },options)       
        var $items = $(container).children(options.items);     
        $items.css({
            "left" : "0px",
            "top" : "0px",
            "position" : "relative",
            "display" : "table-cell"
        });
    };
    
    return columns;    
    
});
