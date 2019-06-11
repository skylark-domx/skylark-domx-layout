define([
    "skylark-langx/langx",
    "skylark-utils-dom/finder",
    "skylark-utils-dom/geom",
    "skylark-utils-dom/styler",
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
