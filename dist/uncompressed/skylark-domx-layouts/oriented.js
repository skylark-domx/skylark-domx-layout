define([
	"skylark-domx-geom",
	"skylark-domx-styler",
	"skylark-domx-finder",
	"./Orientation"
],function(
	geom,
	styler,
	finder,
	Orientation
){

	/**
	 * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
	 * and non-draggable elements
	 * @param  {HTMLElement} el       The parent element
	 * @param  {Number} childNum      The index of the child
	 * @param  {Object} options       Parent Sortable's options
	 * @return {HTMLElement}          The child at index childNum, or null if not found
	 */
	function _getChild(el, childNum, options) {
		var currentChild = 0,
			i = 0,
			children = el.children;

		while (i < children.length) {
			if (
				children[i].style.display !== 'none' &&
				//children[i] !== ghostEl &&
				//children[i] !== dragEl &&
				!options.excluding.includes(children[i] ) && 
				finder.closest(children[i], options.draggable, el, false)
			) {
				if (currentChild === childNum) {
					return children[i];
				}
				currentChild++;
			}

			i++;
		}
		return null;
	}


	/**
	 * Detects children orientation.
	 */
	function oriented(el, options) {
		var elCSS = styler.css(el),

			elWidth = geom.contentRect(el).width,

			child1 = _getChild(el, 0, options),
			child2 = _getChild(el, 1, options),
			firstChildCSS = child1 && styler.css(child1),
			secondChildCSS = child2 && styler.css(child2),

			firstChildWidth = child1 && geom.marginSize(child1).width,
			secondChildWidth = child2 && geom.marginSize(child2).width;

		if (elCSS.display === 'flex') {
			return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse'
			? Orientation.Vertical : Orientation.Horizontal;
		}

		if (elCSS.display === 'grid') {
			return elCSS.gridTemplateColumns.split(' ').length <= 1 ? Orientation.Vertical : Orientation.Horizontal;
		}

		if (child1 && firstChildCSS.float !== 'none') {
			var touchingSideChild2 = firstChildCSS.float === 'left' ? 'left' : 'right';

			return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ?
				Orientation.Vertical : Orientation.Horizontal;
		}

		return (child1 &&
			(
				firstChildCSS.display === 'block' ||
				firstChildCSS.display === 'flex' ||
				firstChildCSS.display === 'table' ||
				firstChildCSS.display === 'grid' ||
				firstChildWidth >= elWidth &&
				elCSS[CSSFloatProperty] === 'none' ||
				child2 &&
				elCSS[CSSFloatProperty] === 'none' &&
				firstChildWidth + secondChildWidth > elWidth
			) ?
			Orientation.Vertical : Orientation.Horizontal
		);
	}

	return oriented;
});