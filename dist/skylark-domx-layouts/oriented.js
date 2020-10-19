/**
 * skylark-domx-layouts - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-domx-geom","skylark-domx-styler","skylark-domx-finder","./Orientation"],function(r,t,e,i){return function(l,n){var o=t.css(l),a=r.contentRect(l).width,c=e.childAt(l,0,n),d=e.childAt(l,1,n),s=c&&t.css(c),f=d&&t.css(d),y=c&&r.marginSize(c).width,m=d&&r.marginSize(d).width;if("flex"===o.display)return"column"===o.flexDirection||"column-reverse"===o.flexDirection?i.Vertical:i.Horizontal;if("grid"===o.display)return o.gridTemplateColumns.split(" ").length<=1?i.Vertical:i.Horizontal;if(c&&"none"!==s.float){var p="left"===s.float?"left":"right";return!d||"both"!==f.clear&&f.clear!==p?i.Horizontal:i.Vertical}return c&&("block"===s.display||"flex"===s.display||"table"===s.display||"grid"===s.display||y>=a&&"none"===o[CSSFloatProperty]||d&&"none"===o[CSSFloatProperty]&&y+m>a)?i.Vertical:i.Horizontal}});
//# sourceMappingURL=sourcemaps/oriented.js.map
