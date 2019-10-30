/**
 * skylark-domx-layouts - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx/skylark");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-domx-layouts/layouts',[
    "skylark-langx/skylark"
], function(skylark) {
	
	return skylark.attach("domx.layouts",{});
});
define('skylark-domx-layouts/Orientation',[
    "skylark-langx/langx",
    "./layouts"
], function(langx,layouts) {

    var Orientation = layout.Orientation = {
    	"horz" : 1, 
    	"vert" : 2
    };
    return Orientation;
});

define('skylark-domx-layouts/box',[
    "skylark-langx/langx",
    "skylark-domx-query",
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

define('skylark-domx-layouts/bsgrid',[
    "skylark-langx/langx",
    "./layouts"
], function(langx,layouts) {
    // summary:
    //  The bsgrid layouter is a bootstrap grid layout manager. 

    //TODO: 
    var bsgrid = layouts.bsgrid = function(container,options) {
        throw new Error ("This method is not implemented!");
    };

    return bsgrid;
});

define('skylark-domx-layouts/columns',[
    "skylark-langx/langx",
    "skylark-domx-query",
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

define('skylark-domx-layouts/DockStyle',[
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

define('skylark-domx-layouts/dock',[
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

define('skylark-domx-layouts/flow',[
    "skylark-langx/langx",
    "skylark-domx-query",
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

define('skylark-domx-layouts/grid',[
    "skylark-langx/langx",
    "./layouts"
], function(langx,layouts) {
    //TODO: 
    var grid = layouts.grid = function(container,options) {
        throw new Error ("This method is not implemented!");
    };

    return grid;
});

define('skylark-domx-layouts/masonry',[
    "skylark-langx/langx",
    "skylark-domx-finder",
    "skylark-domx-geom",
    "skylark-domx-styler",
    "./layouts"
],function(langx,finder,geom,styler,layouts) {
    // summary:
    //  The masnory layouter is a masonry grid layout manager. 
   
    var MasonryLayouter = langx.klass({
        _measureColumns: function(children, bounds, container) {

            var _ = this._,
                calculated = _.calculated;
            // if columnWidth is 0, default to outerWidth of first item
            if (!_.columnWidth) {
                var firstItem = children[0];
                // columnWidth fall back to item of first element
                calculated.columnWidth = firstItem && firstItem.bounds().extraWidth() || bounds.width;
            } else {
                calculated.columnWidth = _.columnWidth;
            }

            var columnWidth = calculated.columnWidth += _.gutter;

            // calculate columns
            var containerWidth = bounds.width + _.gutter;
            var cols;
            if (_.cols) {
                cols = _.cols;
            } else {
                var cols = containerWidth / columnWidth;
                // fix rounding errors, typically with gutters
                var excess = columnWidth - containerWidth % columnWidth;
                // if overshoot is less than a pixel, round up, otherwise floor it
                var mathMethod = excess && excess < 1 ? 'round' : 'floor';
                cols = Math[mathMethod](cols);
            }
            calculated.cols = Math.max(cols, 1);
        },

        _positionItem: function(item, x, y, isInstant) {
            styler.css(item, {
                position: "absolute" 
            });
            if (isInstant) {
                // if not transition, just set CSS
                geom.relativePositionitem(item,{
                    left : x,
                    top : y
                });
            } else {
                item[this._.animation] ? item[this._.animation](x, y) : item.moveto(x, y);
            }
        },
        _getColGroup: function(colSpan) {
            var _ = this._,
                calculated = _.calculated;

            if (colSpan < 2) {
                // if brick spans only one column, use all the column Ys
                return calculated.colYs;
            }

            var colGroup = [];
            // how many different places could this brick fit horizontally
            var groupCount = calculated.cols + 1 - colSpan;
            // for each group potential horizontal position
            for (var i = 0; i < groupCount; i++) {
                // make an array of colY values for that one group
                var groupColYs = calculated.colYs.slice(i, i + colSpan);
                // and get the max value of the array
                colGroup[i] = Math.max.apply(Math, groupColYs);
            }
            return colGroup;
        },

        _getItemLayoutPosition: function(item) {
            var _ = this._,
                calculated = _.calculated;

            var itemSize = geom.marginSize(item);
            // how many columns does this brick span
            var remainder = itemSize.width % calculated.columnWidth;
            var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
            // round if off by 1 pixel, otherwise use ceil
            var colSpan = Math[mathMethod](itemSize.width / calculated.columnWidth);
            colSpan = Math.min(colSpan, calculated.cols);

            var colGroup = this._getColGroup(colSpan);
            // get the minimum Y value from the columns
            var minimumY = Math.min.apply(Math, colGroup);
            var shortColIndex = colGroup.indexOf(minimumY);

            // position the brick
            var position = {
                x: calculated.columnWidth * shortColIndex,
                y: minimumY
            };

            // apply setHeight to necessary columns
            var setHeight = minimumY + itemSize.height;
            var setSpan = calculated.cols + 1 - colGroup.length;
            for (var i = 0; i < setSpan; i++) {
                calculated.colYs[shortColIndex + i] = setHeight;
            }
            return position;
        },

        "_filterItems": function(items) {
            return items;
        },

        "_resetLayout": function(children, bounds, container) {
            var _ = this._,
                calculated = _.calculated;
            this._measureColumns(children, bounds, container);

            // reset column Y
            calculated.colYs = [];
            for (var i = 0; i < calculated.cols; i++) {
                calculated.colYs.push(0);
            }
            calculated.maxY = 0;
        },

        "_calcLayout": function(children, bounds, container) {
            this._resetLayout(children, bounds, container);
            var calcInfos = [];

            children.forEach(function(item) {
                // get x/y object from method
                var position = this._getItemLayoutPosition(item);
                // enqueue
                position.item = item;
                //position.isInstant = isInstant || item.isLayoutInstant;
                calcInfos.push(position);
            }, this);
            return calcInfos;
        },

        "_postLayout": function(calcInfos, container) {
            var _ = this._;
            if (_.autoFit) {
                //var size = container.size;
                //size.height = _.calculated.maxY;
                //container.size = size;
                //TODO: needs a better implementation
                var calculated = _.calculated,
                    maxY = Math.max.apply(Math, calculated.colYs);

                container.domNode.style.height = maxY + "px";
            }
            calcInfos.forEach(function(calcInfo) {
                this._positionItem(calcInfo.item, calcInfo.x, calcInfo.y, calcInfo.isInstant);
            }, this);
            //return children;
        },

        "layout": function() {
            var _ = this._,
                container = _.container,
                children = finder.children(container,_.items),
                bounds = geom.clientSize(container);
                
            var calcInfos = this._calcLayout(children,bounds,container);
            this._postLayout(calcInfos,container);
        },

        "init": function(container,options) {
            var _ = this._ =  langx.mixin ({
                autoFit: true, //dd
                columnWidth: 0, //dd
                cols: 0, //d
                gutter: 0, //
                animation: "moveto", //dd
                calculated: {
                    colYs: null,
                    columnWidth: 0,
                    cols: 0
                }
            },options);
            _.container = container;
        }
    });

    
    var masonry  = layouts.masonry = function(container,options) {
        var layouter = new MasonryLayouter(container,options);
        layouter.layout();
    };

    return masonry;
});

define('skylark-domx-layouts/rows',[
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

define('skylark-domx-layouts/table',[
    "skylark-langx/langx",
    "skylark-domx-query",
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

define('skylark-domx-layouts/main',[
    "./layouts",
    "./box",
    "./bsgrid",
    "./columns",
    "./dock",
    "./DockStyle",
    "./flow",
    "./grid",
    "./masonry",
    "./rows",
    "./table"
], function(layouts) {

	return layouts;
});
define('skylark-domx-layouts', ['skylark-domx-layouts/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-domx-layouts.js.map
