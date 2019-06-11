define([
    "skylark-langx/langx",
    "skylark-utils-dom/styler",
    "./layouts"
], function(langx,styler,layouts) {


    var flexbox = layouts.flexbox = function(container,options) {
        var options = langx.mixin({
            items : ".item", // children element selector for item
            direction : "row", // flex-direction : row,row-reverse,column,column-reverse
            wrap  : "wrap",   // flex-wrap : nowrap,wrap,wrap-reverse
            inline : false
        },options);


        styler.css(container,{
        	"display" : options.inline ?"inline-flex" :  "flex",
        	"flex-direction" : options.direction,
        	"flex-wrap" : option.wrap
        });

    };
    
    return flexbox;
});
