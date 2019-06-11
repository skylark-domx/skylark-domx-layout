define([
    "skylark-langx/langx",
    "skylark-utils-dom/query",
    "./layouts",
], function(langx,$,layouts) {

    var table = layouts.table = function(container,options) {
        var options = langx.mixin({
            items : ".item" // children element selector for item
        },options)       
        var $items = $(container).children(options.items);             

        $items.css({
            "width" : "100%",
            "display" : "table-row"
        });

        $items.each(function(){
            $(this).children().css({
                "display" : "table-cell"
            });
        })
    };
    
    return table;    

});
