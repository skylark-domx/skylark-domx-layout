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
	 * Detects children orientation.
	 */
	function oriented(el, options) {
		var elCSS = styler.css(el),

			elWidth = geom.contentRect(el).width,

			child1 = finder.childAt(el, 0, options),
			child2 = finder.childAt(el, 1, options),
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
				elCSS.float === 'none' ||
				child2 &&
				elCSS.float === 'none' &&
				firstChildWidth + secondChildWidth > elWidth
			) ?
			Orientation.Vertical : Orientation.Horizontal
		);
	}

	return oriented;
});