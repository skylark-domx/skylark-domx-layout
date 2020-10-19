/**
 * skylark-domx-layouts - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-domx-geom","skylark-domx-styler","skylark-domx-finder","./Orientation"],function(e,r,l,i){function t(e,r,i){for(var t=0,n=0,o=e.children;n<o.length;){if("none"!==o[n].style.display&&!i.excluding.includes(o[n])&&l.closest(o[n],i.draggable,e,!1)){if(t===r)return o[n];t++}n++}return null}return function(l,n){var o=r.css(l),a=e.contentRect(l).width,s=t(l,0,n),c=t(l,1,n),d=s&&r.css(s),f=c&&r.css(c),u=s&&e.marginSize(s).width,y=c&&e.marginSize(c).width;if("flex"===o.display)return"column"===o.flexDirection||"column-reverse"===o.flexDirection?i.Vertical:i.Horizontal;if("grid"===o.display)return o.gridTemplateColumns.split(" ").length<=1?i.Vertical:i.Horizontal;if(s&&"none"!==d.float){var g="left"===d.float?"left":"right";return!c||"both"!==f.clear&&f.clear!==g?i.Horizontal:i.Vertical}return s&&("block"===d.display||"flex"===d.display||"table"===d.display||"grid"===d.display||u>=a&&"none"===o[CSSFloatProperty]||c&&"none"===o[CSSFloatProperty]&&u+y>a)?i.Vertical:i.Horizontal}});
//# sourceMappingURL=sourcemaps/oriented.js.map
