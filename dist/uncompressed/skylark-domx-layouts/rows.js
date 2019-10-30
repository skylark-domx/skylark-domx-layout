define([
    "skylark-langx/langx",
    "skylark-domx-query",
    "./layouts",
], function(langx,$,layouts) {
    // summary:
    //  The bsgrid layouter is a layout manager that adds each child item to a separate row. 

    var rows = layouts.rows = function(container,options) {
        var options = langx.mixin({
            items : ".item" // children element selector for item
        },options)       
        var $items = $(container).children(options.items);     
        $items.css({
            "left" : "0px",
            "top" : "0px",
            "position" : "relative",
            "display" : "list-item"
        });
    };
    
    return rows;
    
});
