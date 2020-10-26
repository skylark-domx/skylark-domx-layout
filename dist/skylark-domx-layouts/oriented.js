/**
 * skylark-domx-layouts - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-domx-geom","skylark-domx-styler","skylark-domx-finder","./Orientation"],function(i,l,t,e){return function(r,n){var a=l.css(r),o=i.contentRect(r).width,c=t.childAt(r,0,n),d=t.childAt(r,1,n),s=c&&l.css(c),f=d&&l.css(d),m=c&&i.marginSize(c).width,u=d&&i.marginSize(d).width;if("flex"===a.display)return"column"===a.flexDirection||"column-reverse"===a.flexDirection?e.Vertical:e.Horizontal;if("grid"===a.display)return a.gridTemplateColumns.split(" ").length<=1?e.Vertical:e.Horizontal;if(c&&"none"!==s.float){var y="left"===s.float?"left":"right";return!d||"both"!==f.clear&&f.clear!==y?e.Horizontal:e.Vertical}return c&&("block"===s.display||"flex"===s.display||"table"===s.display||"grid"===s.display||m>=o&&"none"===a.float||d&&"none"===a.float&&m+u>o)?e.Vertical:e.Horizontal}});
//# sourceMappingURL=sourcemaps/oriented.js.map
